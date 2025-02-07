'use client';

import { ThemeProvider } from '@mui/material';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { ReactNode } from 'react';
import theme from '@/styles/theme';
import { ReactQueryClientProvider } from '@/providers/ReactQueryClientProvider';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { ptBR } from '@mui/x-date-pickers/locales'

export function Providers({ children }: { children: ReactNode }) {
  return (
    <AppRouterCacheProvider>
      <LocalizationProvider dateAdapter={AdapterDayjs}
      localeText={ptBR.components.MuiLocalizationProvider.defaultProps.localeText}>
        <ReactQueryClientProvider>
          <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </ReactQueryClientProvider>
      </LocalizationProvider>
    </AppRouterCacheProvider>
  );
}
