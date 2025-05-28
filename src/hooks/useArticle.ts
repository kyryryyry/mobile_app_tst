import {useQuery} from '@tanstack/react-query';
import {Article} from '../types/Article';

const fetchArticle = async (id: number): Promise<Article> => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  const data: Article = await response.json();
  return data;
};

export const useArticle = (id: number) => {
  const {data: article, isLoading: loading, error} = useQuery({
    queryKey: ['article', id],
    queryFn: () => fetchArticle(id),
    enabled: !!id,
  });

  return {
    article: article || null,
    loading,
    error: error instanceof Error ? error.message : null,
  };
};