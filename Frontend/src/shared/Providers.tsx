import { ReactNode } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { ThemeProvider } from 'styled-components';

import { theme } from '@/styles';

const queryClient = new QueryClient();

export const Providers = ({ children }: { children: ReactNode }) => {
  const methods = useForm({});

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <FormProvider {...methods}>
          <ThemeProvider theme={theme}>
            <ToastContainer />
            {children}
          </ThemeProvider>
        </FormProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};
