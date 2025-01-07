import { createSlice } from '@reduxjs/toolkit';

interface MenuState {
  menu: string;
}

const initialState: MenuState = {
  menu: '',
};

const menueSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    setMenu(state, action) {
      state.menu = action.payload;
    },
  },
});

export const { setMenu } = menueSlice.actions;
export default menueSlice.reducer;
