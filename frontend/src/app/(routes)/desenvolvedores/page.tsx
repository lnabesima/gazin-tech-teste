'use client';
import { Box, Button, Container, Stack } from '@mui/material';
import { HeaderComponent } from '@/components/Header';
import { BreadcrumbItem } from '../../../../@types/Header';
import { CustomButton } from '@/components/ButtonLink';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { z } from 'zod';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  CreateDeveloper,
  IncomingDeveloper,
  mutateDeveloperProps,
  RenderDeveloper,
  selectableOperations,
} from '../../../../@types/DevelopersPage';
import { ChangeEvent, FormEvent, useState } from 'react';
import { OperationsModal } from '@/components/Modal';
import { Dayjs } from 'dayjs';

const developerSchema = z.object({
  name: z.string().min(3, { message: 'O nome precisa ter ao menos três caracteres.' }),
  sex: z.string().min(1).max(1).regex(/^[MF]$/, { message: 'Sexo precisa ser M ou F.' }),
  levelId: z.number().int().min(1, { message: 'Nível é um campo requerido.' }),
  hobby: z.string().min(1, { message: 'Hobby é um campo requerido.' }),
});

export default function DevelopersPage() {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [selectedOperation, setSelectedOperation] = useState<selectableOperations>('POST');
  const [developerId, setDeveloperId] = useState<number | undefined>(undefined);
  const [developer, setDeveloper] = useState<CreateDeveloper>({
    nome: '',
    sexo: 'M',
    dataNascimento: '1989-10-14',
    nivelId: 0,
    hobby: '',
  });
  const [error, setError] = useState<string | null>(null);

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  const fetchDevelopers = async () => {
    const res = await fetch(`${API_BASE_URL}/desenvolvedores`);
    if (!res.ok) {
      throw new Error('Failed to fetch developers');
    }
    return res.json();
  };

  const mutateDeveloper = async ({
    selectedOperation, developerId, developer,
  }: mutateDeveloperProps) => {
    const url = developerId ? `${API_BASE_URL}/desenvolvedores/${developerId}` : `${API_BASE_URL}/desenvolvedores`;

    const res = await fetch(url, {
      method: selectedOperation,
      headers: {
        'Content-Type': 'application/json',
      },
      body: selectedOperation !== 'DELETE' ? JSON.stringify(developer) : null,
    });

    if (!res.ok) {
      throw new Error(
        `Failed to ${selectedOperation === 'POST' ? 'create' : selectedOperation === 'PATCH' ? 'update' : 'delete'} developer`);
    }
    return res.status !== 204 ? res.json() : null;
  };

  const queryClient = useQueryClient();
  const { data, error: fetchError, isLoading } = useQuery({
    queryKey: ['developers'],
    queryFn: fetchDevelopers,
  });
  const { mutate, isPending, error: mutationError } = useMutation({
    mutationFn: mutateDeveloper,
    mutationKey: ['postDeveloper'],
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['developers'],
      });
      setError(null);
      setDeveloper(prevState => ( {
        ...prevState,
        nome: '',
        sexo: 'M',
        dataNascimento: '',
        nivelId: 0,
        hobby: '',

      } ));
      setOpenModal(false);
    },
    onError: (mutationError) => {
      setError(mutationError.message || 'Failed to submit');
    },
  });

  const mappedDevelopers: RenderDeveloper[] = data?.map(
    (developer: IncomingDeveloper): RenderDeveloper => ( {
      id: developer.id,
      name: developer.nome,
      sex: developer.sexo,
      age: developer.idade,
      level: developer.nivel.nivel,
      hobby: developer.hobby,
    } ));

  const handleDeveloperChange = (e: ChangeEvent<HTMLInputElement>) => {
    const field = e.target.name as keyof CreateDeveloper;
    let value: string | number = e.target.value;

    if (field === 'nivelId') {
      value = Number(e.target.value);
    }

    setDeveloper((prevState) => ( {
      ...prevState,
      [field]: value,
    } ));
  };


  const handleDateChange = (newDate: Dayjs | null) => {
    setDeveloper((prevState) => ( {
      ...prevState,
      dataNascimento: newDate ? newDate.toISOString().split('T')[0] : '',
    } ));
  };

  const handleOpenCloseModal = () => {
    setOpenModal(!openModal);
  };


  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    try {
      mutate({ selectedOperation: selectedOperation, developer: developer, developerId: developerId });
    } catch (error) {
      setError('Failed to submit');
    }
  };

  const handleOperation = (method: "POST" | "PATCH" | "DELETE", developerId: number) => {
    if (method === 'PATCH') {
      const filteredDeveloper: IncomingDeveloper = data.find(
        (developer: IncomingDeveloper) => developer.id === developerId);

      setDeveloper((prevState) => (
        {
          ...prevState,
          nome: filteredDeveloper.nome,
          sexo: filteredDeveloper.sexo,
          dataNascimento: filteredDeveloper.data_nascimento,
          nivelId: filteredDeveloper.nivel.id,
          hobby: filteredDeveloper.hobby,
        } ));
    }

    setOpenModal(true);
    setSelectedOperation(method)
    setDeveloperId(developerId)
  };

  const breadcrumbs: BreadcrumbItem[] = [
    {
      id: 1,
      href: '/',
      label: 'Home',
    },
    {
      id: 2,
      href: '/desenvolvedores',
      label: 'Desenvolvedores',
    },
  ];

  const developersColumns: GridColDef[] = [
    { field: 'id', headerName: 'ID', flex: 0.5 },
    { field: 'name', headerName: 'Nome do desenvolvedor', flex: 1.5 },
    { field: 'sex', headerName: 'Sexo', flex: 0.5 },
    { field: 'age', headerName: 'Idade', flex: 0.5 },
    { field: 'level', headerName: 'Nível', flex: 1 },
    { field: 'hobby', headerName: 'Hobby', flex: 1 },
    {
      field: 'actionButtons', headerName: 'Ações', flex: 1, align: 'center',
      renderCell: (params: GridRenderCellParams) => (
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 1, sm: 2 }}
               alignItems={'center'} justifyContent={'center'}
               sx={{ height: { xs: 'auto', sm: '100%' } }}>
          <Button variant="contained" color="warning" size="small"
                  onClick={() => handleOperation("PATCH",params.row.id)}>
            Editar
          </Button>
          <Button variant="contained" color="error" size="small"
                  onClick={() => handleOperation("DELETE", params.row.id)}>
            Deletar
          </Button>
        </Stack> ),
    },
  ];

  return (
    <>
      <Container maxWidth={'lg'} sx={{ mt: 2 }}>
        <HeaderComponent title={'Desenvolvedores'} breadcrumbs={breadcrumbs} />
        <Stack direction="row" spacing={2}
               sx={{ width: '100%', justifyContent: 'space-between', mb: 2 }}>
          <Box>
            <CustomButton target={'/'} label={'Home'} />
            <CustomButton target={'/niveis'} label={'Niveis'} />
          </Box>

          <Button type={'button'} variant={'contained'} color={'primary'}
                  onClick={handleOpenCloseModal}>Cadastrar
            desenvolvedor</Button>
        </Stack>

        <DataGrid columns={developersColumns} rows={mappedDevelopers} loading={isLoading}
                  slotProps={{
                    loadingOverlay: {
                      variant: 'skeleton', noRowsVariant: 'skeleton',
                    },
                  }} />

        <OperationsModal openModal={openModal} action={selectedOperation} type={'developers'}
                         isPending={isPending}
                         error={error} onSubmit={handleSubmit} onClose={handleOpenCloseModal}
                         developer={developer}
                         handleChangeDeveloper={handleDeveloperChange}
                         handleDateChange={handleDateChange} />


      </Container>
    </>
  );
}
