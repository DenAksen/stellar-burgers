import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';
import { CONSTRUCTOR_BURGER_SLICE_NAME } from './sliceNames';

export interface ConstructorBurgerState {
  items: {
    bun: TIngredient | null;
    ingredients: TConstructorIngredient[];
  };
}

const initialState: ConstructorBurgerState = {
  items: {
    bun: null,
    ingredients: []
  }
};

export const constructorBurgerSlice = createSlice({
  name: CONSTRUCTOR_BURGER_SLICE_NAME,
  initialState,
  reducers: {
    addBun: (state, action: PayloadAction<TIngredient>) => {
      state.items.bun = action.payload;
    },
    addIngredient: {
      prepare: (ingridient: TIngredient) => ({
        payload: {
          ...ingridient,
          id: nanoid()
        }
      }),
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        state.items.ingredients.push(action.payload);
      }
    },
    removeIngredient: (state, action: PayloadAction<string>) => {
      state.items.ingredients = state.items.ingredients.filter(
        (ingredient) => ingredient.id !== action.payload
      );
    },
    clearConstructor: (state) => {
      state.items = {
        bun: null,
        ingredients: []
      };
    },
    moveIngredientUp: (state, action: PayloadAction<string>) => {
      const ingredientId = action.payload;
      const ingredients = state.items.ingredients;
      const currentIndex = ingredients.findIndex(
        (item) => item.id === ingredientId
      );

      if (currentIndex > 0) {
        const currentIngridients = ingredients[currentIndex];
        ingredients[currentIndex] = ingredients[currentIndex - 1];
        ingredients[currentIndex - 1] = currentIngridients;
      }
    },

    moveIngredientDown: (state, action: PayloadAction<string>) => {
      const ingredientId = action.payload;
      const ingredients = state.items.ingredients;
      const currentIndex = ingredients.findIndex(
        (item) => item.id === ingredientId
      );

      if (currentIndex < ingredients.length - 1) {
        const currentIngridients = ingredients[currentIndex];
        ingredients[currentIndex] = ingredients[currentIndex + 1];
        ingredients[currentIndex + 1] = currentIngridients;
      }
    }
  },
  selectors: {
    selectConstructorState: (state) => state.items,
    dataForNewOrder: (state) => {
      if (!state.items.bun || state.items.ingredients.length === 0) {
        return [];
      }
      const orderId: string[] = [
        state.items.bun._id,
        state.items.bun._id,
        ...state.items.ingredients.map((ing) => ing._id)
      ];
      return orderId;
    }
  }
});

export const constructorBurgerActions = constructorBurgerSlice.actions;
export const constructorBurgerSelectors = constructorBurgerSlice.selectors;
export default constructorBurgerSlice;
