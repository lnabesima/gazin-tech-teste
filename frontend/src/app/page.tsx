import { Box, Button, Container, Stack, Typography } from '@mui/material';
import Link from 'next/link';
import { HeaderComponent } from '@/components/Header';
import { BreadcrumbItem } from '../../@types/Header';
import { CustomButton } from '@/components/ButtonLink';

export default function Home(){

  const breadcrumbs: BreadcrumbItem[] = [
    {
      id: 1,
      href: "/",
      label: "Home"
    }
  ]
  return (
    <>
      <Container maxWidth={"lg"} sx={{mt: 2}}>
      <HeaderComponent title={"Home"} breadcrumbs={breadcrumbs}/>

      <Stack direction={'row'} spacing={2} sx={{ width: '100%', justifyContent: 'space-between', mb: 2 }}>
      <Box>
        <CustomButton target={'/niveis'} label={'Níveis'} />
        <CustomButton target={'/desenvolvedores'} label={'Desenvolvedores'} />
      </Box>
      </Stack>
        <Stack spacing={4}>
        <Box>
          <Typography variant={"h3"}>
            Seja bem vindo!
          </Typography>
          <Typography>
            Bem vindo ao sistema de gerenciamento de desenvolvedores e níveis. Aqui poderá realizar o cadastro, edição e exlusão de desenvolvedores e níveis da sua base de dados de maneira fácil e rápida.
          </Typography>
        </Box>


        <Box>
          <Typography variant={"h4"}>
            Níveis
          </Typography>
          <Typography >
            Cadastre aqui os níveis dos desenvolvedores.
            Esta tela listará todos os níveis cadastrados, e você poderá adicionar novos aqui. É importante que cada um deles seja único!
            E não esqueça de alocar os desenvolvedores para outros níveis caso queira excluir algum.
          </Typography>
        </Box>

        <Box>
          <Typography variant={"h4"}>
            Desenvolvedores
          </Typography>
          <Typography>
            Cadastre aqui os desenvolvedores do seu time.
            Aqui poderá fazer a gestão deles, incluindo novos profissionais, editar os atuais e excluir os talentos que foram para outros desafios.
            Aproveite para conhecer e registrar os <em>hobbies</em> dos membros da sua equipe!
          </Typography>
        </Box>
        </Stack>
      </Container>
    </>
  )
}
