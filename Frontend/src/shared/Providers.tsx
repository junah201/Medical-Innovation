import { ConfirmProvider } from 'material-ui-confirm';
import { ReactNode } from 'react';
import {
  FormProvider,
  useForm,
} from 'react-hook-form';
import {
  QueryClient,
  QueryClientProvider,
} from 'react-query';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { ThemeProvider } from 'styled-components';

import { theme } from '@/styles';
import ThemeProviderForEmotion from '@/theme';

const queryClient = new QueryClient();

export const Providers = ({
  children,
}: {
  children: ReactNode;
}) => {
  const methods = useForm({});

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <FormProvider {...methods}>
          <ThemeProvider theme={theme}>
            <ThemeProviderForEmotion>
              <ConfirmProvider
                defaultOptions={{
                  confirmationText: '예',
                  cancellationText: '아니요',
                  titleProps: {
                    sx: {
                      fontSize: '1rem',
                      fontWeight: 'bold',
                      fontFamily:
                        "'Public Sans', sans-serif",
                    },
                  },
                  contentProps: {
                    sx: {
                      fontSize: '0.875rem',
                      fontWeight: 'bold',
                      fontFamily:
                        "'Public Sans', sans-serif",
                    },
                  },
                  confirmationButtonProps: {
                    sx: {
                      display: 'none',
                      fontSize: '0.8rem',
                      fontWeight: 'bold',
                      fontFamily:
                        "'Public Sans', sans-serif",
                    },
                  },
                  cancellationButtonProps: {
                    sx: {
                      display: 'none',
                      fontSize: '0.8rem',
                      fontWeight: 'bold',
                      fontFamily:
                        "'Public Sans', sans-serif",
                    },
                  },
                }}
              >
                <ToastContainer />
                {children}
              </ConfirmProvider>
            </ThemeProviderForEmotion>
          </ThemeProvider>
        </FormProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};
