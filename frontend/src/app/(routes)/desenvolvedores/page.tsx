'use client';
import { Box, Button, Container, Stack } from '@mui/material';
import { HeaderComponent } from '@/components/Header';
import { BreadcrumbItem } from '../../../../@types/Header';
import { CustomButton } from '@/components/ButtonLink';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { z } from 'zod';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { IncomingDeveloper, RenderDeveloper } from '../../../../@types/DevelopersPage';

const developerSchema = z.object({
  name: z.string().min(3, { message: 'O nome precisa ter ao menos três caracteres.' }),
  sex: z.string().min(1).max(1).regex(/^[MF]$/, { message: 'Sexo precisa ser M ou F.' }),
  age: z.number().int().min(18, { message: 'Idade precisa ser maior que 18 anos.' }),
  levelId: z.number().int().min(1, { message: 'Nível é um campo requerido.' }),
  hobby: z.string().min(1, { message: 'Hobby é um campo requerido.' }),
});

export default function DevelopersPage() {

  const fetchDevelopers = async () => {
    const res = await fetch('http://localhost:5001/api/v1/desenvolvedores');
    if (!res.ok) {
      throw new Error('Failed to fetch developers');
    }
    return res.json();
  };

  const queryClient = useQueryClient();
  const { data, error: fetchError, isLoading } = useQuery({
    queryKey: ['developers'],
    queryFn: fetchDevelopers,
  });


  const mappedDevelopers:RenderDeveloper[] = data?.map((developer: IncomingDeveloper):RenderDeveloper => ({
    id: developer.id,
    name: developer.nome,
    sex: developer.sexo,
    age: developer.idade,
    level: developer.nivel.nivel,
    hobby: developer.hobby,
  }))

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
    { field: 'name', headerName: 'Nome do desenvolvedor', flex: 2 },
    { field: 'sex', headerName: 'Sexo', flex: 1 },
    { field: 'age', headerName: 'Idade', flex: 1 },
    { field: 'level', headerName: 'Nível', flex: 1 },
    { field: 'hobby', headerName: 'Hobby', flex: 1 },
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

          <Button type={'button'} variant={'contained'} color={'primary'} onClick={() => {}}>Cadastrar
            desenvolvedor</Button>
        </Stack>

        <DataGrid columns={developersColumns} rows={mappedDevelopers} loading={isLoading} slotProps={{
          loadingOverlay: {
            variant: 'skeleton', noRowsVariant: 'skeleton',
          },
        }} />


      </Container>
    </>
  );
}
