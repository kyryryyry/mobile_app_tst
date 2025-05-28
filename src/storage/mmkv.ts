import {MMKV} from 'react-native-mmkv';

export const storage = new MMKV({
  id: 'articles-storage',
  encryptionKey: 'articles-encryption-key',
});

export enum storageKeys {
  ARTICLES = 'articles',
  ARTICLE_PREFIX = 'article_',
  LAST_SYNC = 'last_sync',
}
