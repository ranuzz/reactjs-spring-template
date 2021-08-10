import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createItem } from './ItemAPI';

const initialState = {
    items: [],
    status: "idle",
    createdItems: []
}

export const createItemAsync = createAsyncThunk(
    'item/createItem',
    async (item) => {
      const response = await createItem(item);
      return response.data.itemValue;
    }
  );

  
export const itemSlice = createSlice({
    name: "item",
    initialState,
    reducers: {
        addItem: (state, action) => {
            state.items.push(action.payload);
        }
    },
    
    extraReducers: (builder) => {
        builder
        .addCase(createItemAsync.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(createItemAsync.fulfilled, (state, action) => {
            state.status = 'idle';
            state.createdItems.push(action.payload);
        });
  },
});

export const { addItem } = itemSlice.actions;
export default itemSlice.reducer;