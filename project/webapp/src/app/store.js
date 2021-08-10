import { configureStore } from '@reduxjs/toolkit';
import item from '../features/item/ItemSlice';

export const store = configureStore({
  reducer: {
    item: item
  },
});
