import {useQuery, UseQueryOptions} from '@tanstack/react-query';
import {useEffect} from 'react';
import {useNetworkStatus} from './useNetworkStatus';

interface UseOfflineQueryOptions<TData> {
  queryKey: unknown[];
  queryFn: () => Promise<TData>;
  cachedData: TData | undefined;
  onDataFetched?: (data: TData) => void;
  hasData: (data: TData | undefined) => boolean;
  emptyData: TData;
  offlineErrorMessage: string;
  queryOptions?: Omit<UseQueryOptions<TData>, 'queryKey' | 'queryFn' | 'retry'>;
  enabled?: boolean;
}

interface UseOfflineQueryResult<TData> {
  data: TData;
  loading: boolean;
  error: string | null;
  isOffline: boolean;
}

export function useOfflineQuery<TData>({
  queryKey,
  queryFn,
  cachedData,
  onDataFetched,
  hasData,
  emptyData,
  offlineErrorMessage,
  queryOptions = {},
  enabled = true,
}: UseOfflineQueryOptions<TData>): UseOfflineQueryResult<TData> {
  const networkStatus = useNetworkStatus();

  const {
    data: fetchedData,
    isLoading,
    error,
  } = useQuery({
    queryKey,
    queryFn,
    enabled: enabled && networkStatus === 'connected',
    retry: networkStatus === 'disconnected' ? false : 2,
    ...queryOptions,
  });

  // Sync fetched data to offline store
  useEffect(() => {
    if (fetchedData && networkStatus === 'connected' && onDataFetched) {
      onDataFetched(fetchedData);
    }
  }, [fetchedData, networkStatus, onDataFetched]);

  // Handle unknown network state
  if (networkStatus === 'unknown') {
    if (hasData(cachedData)) {
      return {
        data: cachedData!,
        loading: false,
        error: null,
        isOffline: false,
      };
    }
    return {
      data: emptyData,
      loading: true,
      error: null,
      isOffline: false,
    };
  }

  // Determine final data based on network status
  let finalData: TData;

  if (networkStatus === 'disconnected') {
    finalData = cachedData ?? emptyData;
  } else {
    // When connected, prefer fetched data if available, otherwise cached
    finalData = fetchedData ?? cachedData ?? emptyData;
  }

  return {
    data: finalData,
    loading: networkStatus === 'connected' && isLoading && !hasData(cachedData),
    error:
      networkStatus === 'disconnected' && !hasData(cachedData)
        ? offlineErrorMessage
        : error instanceof Error
        ? error.message
        : null,
    isOffline: networkStatus === 'disconnected',
  };
}
