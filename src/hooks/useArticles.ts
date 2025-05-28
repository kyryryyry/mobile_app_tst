import {useQuery} from '@tanstack/react-query';
import {Article} from '../types/Article';

const fetchArticles = async (): Promise<Article[]> => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  const data: Article[] = await response.json();
  return data;
};

export const useArticles = () => {
  const {data: articles = [], isLoading: loading, error} = useQuery({
    queryKey: ['articles'],
    queryFn: fetchArticles,
  });

  return {
    articles,
    loading,
    error: error instanceof Error ? error.message : null,
  };
};