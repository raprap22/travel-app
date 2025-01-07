export type UserLogin = {
  identifier: string;
  email: string;
};

export type UserRegister = {
  email: string;
  username: string;
  password: string;
};

export type UserInfo = {
  id: number;
  documentId: string;
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: any;
};
