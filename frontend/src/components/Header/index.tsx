import { HeaderProps } from '../../../@types/Header';
import { Box, Breadcrumbs, Typography } from '@mui/material';
import Link from 'next/link';

export function HeaderComponent({ title, breadcrumbs }: HeaderProps) {
  return (
    <Box sx={{ mb: 2 }}>
      <Typography variant={'h2'} component={'h1'}>{title}</Typography>
      <Breadcrumbs>
        {breadcrumbs?.map((breadcrumb) => {
          return breadcrumb.href ?
            <Link key={breadcrumb.id} color={"inherit"} href={breadcrumb.href}>{breadcrumb.label}</Link>
            : <Typography key={breadcrumb.id} color={"inherit"}>{breadcrumb.label}</Typography>
        })}
      </Breadcrumbs>
    </Box>
  );
}
