import {useCallback} from 'react';
import {Article} from '../types/Article';
import {useArticlesStore} from '../store/articlesStore';
import {useOfflineQuery} from './useOfflineQuery';

const fetchArticles = async (): Promise<Article[]> => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts');

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data: Article[] = await response.json();
  return data;
};

export const useArticles = () => {
  const offlineArticles = useArticlesStore(state => state.articles);
  const setArticles = useArticlesStore(state => state.setArticles);

  const handleDataFetched = useCallback((articles: Article[]) => {
    if (JSON.stringify(articles) !== JSON.stringify(offlineArticles)) {
      setArticles(articles);
    }
  }, [offlineArticles, setArticles]);

  const result = useOfflineQuery({
    queryKey: ['articles'],
    queryFn: fetchArticles,
    cachedData: offlineArticles,
    onDataFetched: handleDataFetched,
    hasData: (data) => !!data && data.length > 0,
    emptyData: [],
    offlineErrorMessage: 'No cached data available. Please connect to the internet.',
  });

  return {
    articles: result.data,
    loading: result.loading,
    error: result.error,
    isOffline: result.isOffline,
  };
};
