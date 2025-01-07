import { UserInfo } from './user';

export type ArticleRaw = {
  data: Article;
  meta: Pagination;
};
export type Pagination = {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
};

export type Article = {
  id: number;
  documentId: string;
  title: string;
  description: string;
  cover_image_url: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: any;
  category: Category;
  comments: Commentar[];
  user: UserInfo;
};

export type Category = {
  id: number;
  documentId: string;
  name: string;
  description: any;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: any;
};

export type Commentar = {
  id: number;
  documentId: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: any;
  user: UserInfo;
};

export type AddCommentar = {
  content: string;
  article: string;
};

export type CreateArticle = {
  title: string;
  description: string;
  cover_image_url: string;
  category: number;
};
