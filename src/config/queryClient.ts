import {QueryClient} from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30 * 1000, // 30 seconds
      gcTime: 60 * 60 * 1000, // 1 hour
      retry: 2,
      refetchOnWindowFocus: false,
    },
  },
});
