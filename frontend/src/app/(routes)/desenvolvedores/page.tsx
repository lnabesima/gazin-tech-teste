import { Typography } from '@mui/material';
import Link from 'next/link';
import { HeaderComponent } from '@/components/Header';
import { BreadcrumbItem } from '../../../../@types/Header';

export default function DevelopersPage() {

  const breadcrumbs: BreadcrumbItem[] = [
    {
      id: 1,
      href: "/",
      label: "Home"
    },
    {
      id: 2,
      href: "/desenvolvedores",
      label: "Desenvolvedores"
    }
  ]
  return(
    <>
    <HeaderComponent title={"Desenvolvedores"} breadcrumbs={breadcrumbs}/>

      <Link href={"/"}>Home</Link>
      <Link href={"/niveis"}>Niveis</Link>
    </>
  )
}
