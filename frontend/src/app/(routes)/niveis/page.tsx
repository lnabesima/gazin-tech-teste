'use client';

import {
  Box,
  Button,
  Container,
  Stack,
} from '@mui/material';
import { z } from 'zod';
import { ChangeEvent, FormEvent, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { CustomButton } from '@/components/ButtonLink';
import { HeaderComponent } from '@/components/Header';
import { BreadcrumbItem } from '../../../../@types/Header';
import {
  HandleSubmitProps,
  Level,
  LevelParam,
  mutateLevelProps,
} from '../../../../@types/LevelsPage';
import { OperationsModal } from '@/components/Modal';

const levelNameSchema = z.string().min(3).max(100);

export default function LevelsPage() {
  const [levelName, setLevelName] = useState<string>('');
  const [selectedLevel, setSelectedLevel] = useState<LevelParam | undefined>(undefined);
  const [selectedOperation, setSelectedOperation] = useState<'POST' | 'PUT' | 'DELETE'>('POST')
  const [error, setError] = useState<string | null>(null);
  const [openModal, setOpenModal] = useState<boolean>(false);



  //lower level fetcher functions

  const fetchLevels = async () => {
    const response = await fetch(`http://localhost:5001/api/v1/niveis`);

    if (!response.ok) {
      throw new Error('Failed to fetch levels');
    }

    return response.json();
  };

  const mutateLevel = async({method, levelId, levelName}: mutateLevelProps) => {
    const url = levelId ? `http://localhost:5001/api/v1//niveis/${levelId}` : `http://localhost:5001/api/v1//niveis`;

    const res = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: method !== 'DELETE' ? JSON.stringify({nivel: levelName}) : null});

    if (!res.ok) {
      throw new Error(`Failed to ${method === 'POST' ? 'create' : method === 'PUT' ? 'update': 'delete' } level`);
    }
    return res.status !== 204 ? res.json() : null;
  }

  //react query related

  const queryClient = useQueryClient();

  const { data, error: fetchError, isLoading } = useQuery({
    queryKey: ['levels'], queryFn: fetchLevels

  });

  const { mutate, isPending, error: mutationError } = useMutation({
    mutationFn: mutateLevel, mutationKey: ['postLevel'], onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['levels'],
      });
      setLevelName('');
      setError(null);
      setOpenModal(false);
    }, onError: (mutationError) => {
      setError(mutationError.message || 'Failed to submit');
    },

  });

  //array to build the datagrid rows

  const mappedLevels = data?.map((level: Level) => ( {
    id: level.id, name: level.nivel,
  } ));

  //helper function to manage state

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLevelName(e.target.value);
  };

  //helper functions to manage the modals

  const handleOpenCloseModal = () => {
    setOpenModal(!openModal);
  };

  const handleOperation = (selectedOperation: 'POST' | 'PUT' | 'DELETE', level?: LevelParam | undefined) => {
    if (selectedOperation !== 'POST' && level !== undefined){
      setSelectedLevel(level)
      setLevelName(level.name)
    }
    setSelectedOperation(selectedOperation)
    setOpenModal(true)
  }


  //helper function to submit data

  const handleSubmit = ({ method, levelId }:HandleSubmitProps) => (e: FormEvent) => {
    e.preventDefault()

    try{
      if (method === 'POST' || method === 'PUT'){
        levelNameSchema.parse(levelName)
      }

      mutate({ method, levelId, levelName: method !== 'DELETE' ? levelName : undefined})
    } catch (error){
      if (error instanceof z.ZodError){
        setError(error.errors[0].message)
      } else {
        setError('An error occurred')
      }
    }
  }


  //array to build the breadcrumb

  const breadcrumbs: BreadcrumbItem[] = [
    {
      id: 1,
      href: '/',
      label: 'Home',
    },
    {
      id: 2,
      href: '/niveis',
      label: 'Niveis',
    },
  ];

  //array to build the datagrid headers

  const levelsColumns: GridColDef[] = [// @ts-ignore
    { field: 'id', headerName: 'ID' },
    {
      field: 'name', headerName: 'Nome do nível', flex: 1,
    },
    {
      field: 'actionButtons', headerName: 'Ações', flex: 0.5, align: 'center',
      renderCell: (params: GridRenderCellParams) => (
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 1, sm: 2 }}
               alignItems={'center'} justifyContent={'center'}
               sx={{ height: { xs: 'auto', sm: '100%' } }}>
          <Button variant="contained" color="warning" size="small" onClick={() => handleOperation('PUT', params.row)}>
            Editar
          </Button>
          <Button variant="contained" color="error" size="small" onClick={() => handleOperation('DELETE', params.row)}>
            Deletar
          </Button>
        </Stack> ),
    }];


  return ( <>
    <Container maxWidth={'lg'} sx={{ mt: 2 }}>
      <HeaderComponent title={'Níveis'} breadcrumbs={breadcrumbs} />

      <Stack direction={'row'} spacing={2} sx={{ width: '100%', justifyContent: 'space-between', mb: 2 }}>
        <Box>
          <CustomButton target={'/'} label={'Home'} />
          <CustomButton target={'/desenvolvedores'} label={'Desenvolvedores'} />
        </Box>

        <Button type={'button'} variant={'contained'} color={'primary'}
                onClick={() => handleOperation('POST')}>Cadastrar nível</Button>
      </Stack>


      <OperationsModal openModal={openModal} action={selectedOperation} type={"levels"} levelName={levelName} handleChangeLevelName={handleChange} isPending={isPending} error={error} onSubmit={handleSubmit({method: selectedOperation, levelId: selectedLevel?.id})} onClose={handleOpenCloseModal}/>


      <DataGrid columns={levelsColumns}
                rows={mappedLevels || []}
                loading={isLoading}
                slotProps={{
                  loadingOverlay: {
                    variant: 'skeleton', noRowsVariant: 'skeleton',
                  },
                }}
                sx={{
                  '& .MuiDataGrid-row': {
                    maxHeight: '150px', // adjust as
                    height: '150px !important',// necessary
                  },
                }}

      />
    </Container>
  </> );
}
