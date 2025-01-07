import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Article } from '../../types/article';

interface ArticleState {
  articles: Article[];
  loading: boolean;
}

const initialState: ArticleState = {
  articles: [],
  loading: false,
};

const articleSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {
    setArticles(state, action: PayloadAction<Article[]>) {
      state.articles = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
  },
});

export const { setArticles, setLoading } = articleSlice.actions;
export default articleSlice.reducer;