import { AxiosResponse } from 'axios';
import {
  useMutation,
  useQuery,
  useQueryClient,
} from 'react-query';

import { Toast } from '@/libs/Toast';
import { AxiosErr } from '@/types';

export {
  QueryClient,
  QueryClientProvider,
} from 'react-query';

interface QueryOptions<DataT> {
  onSuccess?: (res: AxiosResponse<DataT, any>) => void;
  onError?: (error: AxiosErr) => void;
  keepPreviousData?: boolean;
  retry?: number;
  SuccessQueryKey?: any;
  SuccessMessage?: string;
  ErrorMessage?: string;
  staleTime?: number;
  cacheTime?: number;
  disableErrorToast?: boolean;
}

export const useCustomQuery = <DataT = any>(
  queryKey: any[],
  queryFn: () => Promise<AxiosResponse<DataT, any>>,
  options: QueryOptions<DataT>
) => {
  const queryClient = useQueryClient();

  const query = useQuery(queryKey, queryFn, {
    keepPreviousData: options.keepPreviousData || false,
    retry: options.retry || 1,
    staleTime: options.staleTime || 0,
    cacheTime: options.cacheTime || 5 * 60 * 1000,
    onSuccess: (res) => {
      if (options.SuccessMessage) {
        Toast(options.SuccessMessage, 'success');
      }

      if (options.SuccessQueryKey) {
        queryClient.refetchQueries(options.SuccessQueryKey);
      }

      if (options.onSuccess) {
        options.onSuccess(res);
      }
    },
    onError: (err: AxiosErr) => {
      if (err.response?.status === 401) {
        Toast('로그인 세션이 만료되었습니다.', 'error');
        location.reload();
        return;
      }

      if (options.onError) {
        options.onError(err);
      } else {
        const message =
          options.ErrorMessage ||
          '알 수 없는 에러가 발생했습니다.';
        const status = err.response?.status
          ? `${err.response?.status} `
          : '';
        const error: string =
          err.response?.data?.detail ||
          err.response?.data?.message ||
          err.message ||
          JSON.stringify(err);

        if (!options.disableErrorToast)
          Toast(`${message} (${status} ${error})`, 'error');
      }
    },
  });

  return {
    ...query,
  };
};

interface MutationOptions {
  onSuccess?: (res: AxiosResponse<any, any>) => void;
  onError?: (error: AxiosErr) => void;
  SuccessMessage?: string;
  SuccessQueryKey?: string | string[];
  ErrorMessage?: string;
}

export const useCustomMutation = <DataT>(
  mutationFn: (
    userInput: any
  ) => Promise<AxiosResponse<DataT, any>>,
  options: MutationOptions = {}
) => {
  const queryClient = useQueryClient();
  const mutation = useMutation(mutationFn, {
    onSuccess: (res) => {
      if (options.SuccessMessage) {
        Toast(options.SuccessMessage, 'success');
      }

      if (options.SuccessQueryKey) {
        if (typeof options.SuccessQueryKey === 'string') {
          queryClient.refetchQueries(
            options.SuccessQueryKey
          );
        } else if (Array.isArray(options.SuccessQueryKey)) {
          options.SuccessQueryKey.forEach((key) => {
            queryClient.refetchQueries(key);
          });
        }
      }

      if (options.onSuccess) {
        options.onSuccess(res);
      }
    },
    onError: (err: AxiosErr) => {
      if (err.response?.status === 401) {
        Toast('로그인 세션이 만료되었습니다.', 'error');
        location.reload();
        return;
      }

      if (options.onError) {
        options.onError(err);
      } else {
        const message =
          options.ErrorMessage ||
          '알 수 없는 에러가 발생했습니다.';
        const status = err.response?.status
          ? `${err.response?.status} `
          : '';
        const error: string =
          err.response?.data?.detail ||
          err.response?.data?.message ||
          err.message ||
          JSON.stringify(err);

        Toast(`${message} (${status} ${error})`, 'error');
      }
    },
  });

  return {
    ...mutation,
  };
};
