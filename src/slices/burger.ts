import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { BURGER_SLICE_NAME } from './sliceNames';
import { TIngredient } from '@utils-types';
import { getIngredientsApi } from '@api';

export interface BurgerState {
  ingredients: TIngredient[];
  ingredientsLoading: boolean;
}

const initialState: BurgerState = {
  ingredients: [],
  ingredientsLoading: false
};

export const getIngridientsThunk = createAsyncThunk(
  `${BURGER_SLICE_NAME}/getIngridients`,
  async () => {
    const data = await getIngredientsApi();
    return data;
  }
);

const burgerSlice = createSlice({
  name: BURGER_SLICE_NAME,
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getIngridientsThunk.pending, (state) => {
        state.ingredientsLoading = true;
      })
      .addCase(getIngridientsThunk.fulfilled, (state, action) => {
        state.ingredients = action.payload;
        state.ingredientsLoading = false;
      });
  },
  selectors: {
    selectIngridients: (state) => state.ingredients,
    selectIngredientsLoading: (state) => state.ingredientsLoading,
    selectIngredientById: (state, id: string) =>
      state.ingredients.find((ingredient) => ingredient._id === id)
  }
});

export const burgerSelectors = burgerSlice.selectors;
export default burgerSlice;
