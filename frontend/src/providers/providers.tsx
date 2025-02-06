'use client';

import { ThemeProvider } from '@mui/material';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { ReactNode } from 'react';
import theme from '@/styles/theme';
import { ReactQueryClientProvider } from '@/providers/ReactQueryClientProvider';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <AppRouterCacheProvider>
      <ReactQueryClientProvider>
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </ReactQueryClientProvider>
    </AppRouterCacheProvider>
  );
}
