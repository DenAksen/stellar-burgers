import burgerSlice, {
  getIngridientsThunk,
  burgerSelectors
} from '../ingridientsSlice';
import { ingredientsMock } from '../../../mocks/ingredientsMock';
import { stateLoaded } from '../../../mocks/storeStateMock';

beforeAll(() => {
  jest.mock('@api', () => ({
    getIngredientsApi: jest.fn(() => Promise.resolve(ingredientsMock.data))
  }));
});

afterAll(() => {
  jest.unmock('@api');
});

describe('ingridientsSlice', () => {
  const initialState = {
    ingredients: [],
    ingredientsLoading: false
  };

  it('должен возвращать начальное состояние', () => {
    const state = burgerSlice.reducer(undefined, { type: '@@INIT' });
    expect(state).toEqual(initialState);
  });

  describe('getIngridientsThunk', () => {
    it('должен устанавливать ingredientsLoading в true при pending', () => {
      const action = { type: getIngridientsThunk.pending.type };
      const state = burgerSlice.reducer(initialState, action);

      expect(state.ingredientsLoading).toBe(true);
    });

    it('должен записывать моковые данные при fulfilled', () => {
      const action = {
        type: getIngridientsThunk.fulfilled.type,
        payload: ingredientsMock.data
      };

      const state = burgerSlice.reducer(initialState, action);

      expect(state.ingredients).toEqual(ingredientsMock.data);
      expect(state.ingredients).toHaveLength(ingredientsMock.data.length);
      expect(state.ingredientsLoading).toBe(false);
      expect(state.ingredients[0]).toHaveProperty('type', 'bun');
    });

    it('должен устанавливать loading в false при rejected', () => {
      const action = { type: getIngridientsThunk.rejected.type };
      const loadingState = { ...initialState, ingredientsLoading: true };
      const state = burgerSlice.reducer(loadingState, action);
      expect(state.ingredientsLoading).toBe(false);
    });
  });

  describe('селекторы', () => {
    const state = stateLoaded;

    it('selectIngridients должен возвращать ингредиенты из стора', () => {
      const result = burgerSelectors.selectIngridients(state);
      expect(result).toBe(state.burger.ingredients);
      expect(result).toHaveLength(ingredientsMock.data.length);
    });

    it('selectIngredientsLoading должен возвращать loading статус', () => {
      const result = burgerSelectors.selectIngredientsLoading(state);
      expect(result).toBe(state.burger.ingredientsLoading);
    });

    it('selectIngredientById должен возвращать ингредиент по ID', () => {
      const testId = '60d3b41abdacab0026a733c6';
      const result = burgerSelectors.selectIngredientById(state, testId);

      expect(result?._id).toBe(testId);
      expect(result?.name).toBe('Краторная булка N-200i');

      const originalIngredient = state.burger.ingredients.find(
        (i) => i._id === testId
      );
      expect(result).toBe(originalIngredient);
    });
  });
});
