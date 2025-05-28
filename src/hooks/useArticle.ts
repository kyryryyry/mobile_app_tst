import {useCallback} from 'react';
import {Article} from '../types/Article';
import {useArticlesStore} from '../store/articlesStore';
import {useOfflineQuery} from './useOfflineQuery';

const fetchArticle = async (id: number): Promise<Article> => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${id}`,
  );

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data: Article = await response.json();
  return data;
};

export const useArticle = (id: number) => {
  const getCachedArticle = useArticlesStore(state => state.getCachedArticle);
  const setCachedArticle = useArticlesStore(state => state.setCachedArticle);

  const cachedArticle = getCachedArticle(id);

  const handleDataFetched = useCallback(
    (article: Article | null) => {
      if (article) {
        setCachedArticle(id, article);
      }
    },
    [id, setCachedArticle],
  );

  const result = useOfflineQuery<Article | null>({
    queryKey: ['article', id],
    queryFn: () => fetchArticle(id),
    cachedData: cachedArticle || undefined,
    onDataFetched: handleDataFetched,
    hasData: data => !!data,
    emptyData: null,
    offlineErrorMessage:
      'This article is not available offline. Please connect to the internet.',
    enabled: !!id,
  });

  return {
    article: result.data,
    loading: result.loading,
    error: result.error,
    isOffline: result.isOffline,
  };
};
