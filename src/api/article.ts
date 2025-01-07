import axios from 'axios';
import { AddCommentar, CreateArticle } from '../types/article';

const BASE_URL = process.env.REACT_APP_API_BASE_URL;
const token = localStorage.getItem('jwt') || '';
const cleanToken = token.replace(/"/g, '');

interface Filters {
  key?: string;
}

export const fetchArticles = async ({ page = 1, pageSize = 10 }) => {
  const params: Record<string, any> = {};

  if (page && pageSize) {
    {
      params['pagination[page]'] = page;
      params['populate'] = '*';
      params['pagination[pageSize]'] = pageSize;
    }
  }

  if (page === 0 && pageSize === 0) {
    params['populate'] = '*';
  }

  const response = await axios.get(`${BASE_URL}/articles`, {
    params,
  });

  if (page === 0 && pageSize === 0) {
    return response.data.data;
  } else {
    return response.data;
  }
};

export const fetchArticleById = async (id: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${cleanToken}`,
    },
  };
  const { data } = await axios.get(`${BASE_URL}/articles/${id}`, config);
  return data?.data;
};

export const fetchCategory = async () => {
  const config = {
    headers: {
      Authorization: `Bearer ${cleanToken}`,
    },
  };
  const { data } = await axios.get(`${BASE_URL}/categories`, config);
  return data?.data;
};

export const createArticle = async (article: Omit<CreateArticle, 'id'>, URL: string) => {
  const updatedArticle = {
    data: {
      ...article,
      cover_image_url: URL,
    },
  };

  const config = {
    headers: {
      Authorization: `Bearer ${cleanToken}`,
    },
  };

  const { data } = await axios.post(`${BASE_URL}/articles`, updatedArticle, config);

  return data;
};

export const updateArticle = async (article: CreateArticle, URL: string, id: string) => {
  const updatedArticleWithURL = {
    data: {
      ...article,
      cover_image_url: URL,
    },
  };
  const updatedArticleWithoutURL = {
    data: {
      ...article,
    },
  };

  const config = {
    headers: {
      Authorization: `Bearer ${cleanToken}`,
    },
  };

  const { data } = await axios.put(
    `${BASE_URL}/articles/${id}`,
    URL === '' ? updatedArticleWithoutURL : updatedArticleWithURL,
    config
  );
  return data;
};

export const uploadFile = async (file: File, token: string) => {
  const formData = new FormData();
  formData.append('files', file);

  const cleanToken = token.replace(/"/g, '');

  const config = {
    headers: {
      Authorization: `Bearer ${cleanToken}`,
    },
  };

  try {
    const { data } = await axios.post(`${BASE_URL}/upload`, formData, config);
    return data;
  } catch (error) {
    console.error('Upload failed:', error);
    throw error;
  }
};

export const fetchComments = async () => {
  const config = {
    headers: {
      Authorization: `Bearer ${cleanToken}`,
    },
    params: {
      'populate[user]': '*',
    },
  };
  const { data } = await axios.get(`${BASE_URL}/comments`, config);
  return data;
};

export const createComment = async (data: AddCommentar) => {
  const updatedComment = {
    data,
  };

  const config = {
    headers: {
      Authorization: `Bearer ${cleanToken}`,
    },
  };

  const { data: response } = await axios.post(`${BASE_URL}/comments`, updatedComment, config);

  return response;
};
