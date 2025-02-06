import { Typography } from '@mui/material';
import Link from 'next/link';
import { HeaderComponent } from '@/components/Header';
import { BreadcrumbItem } from '../../@types/Header';

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
      <HeaderComponent title={"Home"} breadcrumbs={breadcrumbs}/>

      <Link href={"/niveis"}>Níveis</Link>
      <Link href={"/desenvolvedores"}>Desenvolvedores</Link>
    </>
  )
}
