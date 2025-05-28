import {create} from 'zustand';
import {subscribeWithSelector} from 'zustand/middleware';
import {Article} from '../types/Article';
import {storage, storageKeys} from '../storage/mmkv';

interface State {
  articles: Article[];
  cachedArticles: Map<number, Article>;
  lastSync: number | null;
}

interface Actions {
  setArticles: (articles: Article[]) => void;
  setCachedArticle: (id: number, article: Article) => void;
  getCachedArticle: (id: number) => Article | undefined;
  loadFromStorage: () => void;
  syncToStorage: () => void;
}

type ArticlesState = State & Actions;

export const useArticlesStore = create<ArticlesState>()(
  subscribeWithSelector((set, get) => ({
    articles: [],
    cachedArticles: new Map(),
    lastSync: null,

    setArticles: articles => {
      set({articles, lastSync: Date.now()});
      get().syncToStorage();
    },

    setCachedArticle: (id, article) => {
      set(state => ({
        cachedArticles: new Map(state.cachedArticles).set(id, article),
      }));

      storage.set(
        `${storageKeys.ARTICLE_PREFIX}${id}`,
        JSON.stringify(article),
      );
    },

    getCachedArticle: id => {
      const cachedArticle = get().cachedArticles.get(id);
      if (cachedArticle) return cachedArticle;

      const storedArticle = storage.getString(
        `${storageKeys.ARTICLE_PREFIX}${id}`,
      );
      if (storedArticle) {
        try {
          const article = JSON.parse(storedArticle) as Article;
          get().setCachedArticle(id, article);
          return article;
        } catch (error) {
          console.error('Error parsing stored article:', error);
        }
      }
      return undefined;
    },

    loadFromStorage: () => {
      const storedArticles = storage.getString(storageKeys.ARTICLES);
      if (storedArticles) {
        try {
          const articles = JSON.parse(storedArticles) as Article[];
          const lastSync = storage.getNumber(storageKeys.LAST_SYNC) || null;
          set({articles, lastSync});
        } catch (error) {
          console.error('Error loading articles from storage:', error);
        }
      }

      const allKeys = storage.getAllKeys();
      const articleKeys = allKeys.filter(key =>
        key.startsWith(storageKeys.ARTICLE_PREFIX),
      );

      const cachedArticles = new Map<number, Article>();
      articleKeys.forEach(key => {
        const articleData = storage.getString(key);
        if (articleData) {
          try {
            const article = JSON.parse(articleData) as Article;
            cachedArticles.set(article.id, article);
          } catch (error) {
            console.error('Error parsing cached article:', error);
          }
        }
      });

      set({cachedArticles});
    },

    syncToStorage: () => {
      const {articles, lastSync} = get();
      storage.set(storageKeys.ARTICLES, JSON.stringify(articles));
      if (lastSync) {
        storage.set(storageKeys.LAST_SYNC, lastSync);
      }
    },
  })),
);

useArticlesStore.getState().loadFromStorage();
