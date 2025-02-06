import Link from 'next/link';
import { Button } from '@mui/material';
import { CustomButtonProps } from '../../../@types/CustomButton';

export function CustomButton({ target, label, variant = 'text' }: CustomButtonProps) {
  return (
    <Button component={Link} href={target} variant={variant}>{label}</Button>
  );
}
