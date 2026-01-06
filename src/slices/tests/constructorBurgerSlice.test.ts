import {
  emptyConstructorState,
  mockBun,
  mockMain,
  mockSauce,
  mockConstructorMain,
  mockConstructorSauce,
  constructorWithMultipleIngredients,
  fullConstructorState
} from '../../../mocks/constructorBurgerMock';

import constructorBurgerSlice, {
  constructorBurgerActions
} from '../constructorBurgerSlice';

describe('constructorBurgerSlice', () => {
  const initialState = emptyConstructorState;

  it('должен возвращать начальное состояние', () => {
    const state = constructorBurgerSlice.reducer(undefined, { type: '@@INIT' });
    expect(state).toEqual(initialState);
  });

  describe('addBun', () => {
    it('должен добавлять булку', () => {
      const action = constructorBurgerActions.addBun(mockBun);
      const state = constructorBurgerSlice.reducer(initialState, action);

      expect(state.items.bun).toEqual(mockBun);
      expect(state.items.ingredients).toHaveLength(0);
    });

    it('должен заменять булку при добавлении новой', () => {
      const firstState = constructorBurgerSlice.reducer(
        initialState,
        constructorBurgerActions.addBun(mockBun)
      );

      const otherBun = {
        ...mockBun,
        _id: 'other-bun',
        name: 'Другая булка'
      };

      const action = constructorBurgerActions.addBun(otherBun);
      const finalState = constructorBurgerSlice.reducer(firstState, action);

      expect(finalState.items.bun).toEqual(otherBun);
      expect(finalState.items.bun?._id).toBe('other-bun');
    });
  });

  describe('addIngredient', () => {
    it('должен добавлять начинку', () => {
      const action = constructorBurgerActions.addIngredient(mockMain);
      const state = constructorBurgerSlice.reducer(initialState, action);

      expect(state.items.ingredients).toHaveLength(1);
      expect(state.items.ingredients[0]._id).toBe(mockMain._id);
    });

    it('должен добавлять несколько начинок', () => {
      let state = constructorBurgerSlice.reducer(
        initialState,
        constructorBurgerActions.addIngredient(mockMain)
      );
      state = constructorBurgerSlice.reducer(
        state,
        constructorBurgerActions.addIngredient(mockSauce)
      );

      expect(state.items.ingredients).toHaveLength(2);
      expect(state.items.ingredients[0]._id).toBe(mockMain._id);
      expect(state.items.ingredients[1]._id).toBe(mockSauce._id);
    });
  });

  describe('removeIngredient', () => {
    it('должен удалять начинку по id', () => {
      const state = constructorBurgerSlice.reducer(fullConstructorState, {
        type: ''
      });
      expect(state.items.ingredients).toHaveLength(2);

      const action = constructorBurgerActions.removeIngredient(
        mockConstructorMain.id
      );
      const newState = constructorBurgerSlice.reducer(state, action);

      expect(newState.items.ingredients).toHaveLength(1);
      expect(newState.items.ingredients[0]._id).toBe(mockConstructorSauce._id);
    });

    it('не должен удалять если id не найден', () => {
      const state = constructorBurgerSlice.reducer(fullConstructorState, {
        type: ''
      });
      expect(state.items.ingredients).toHaveLength(2);

      const removeAction =
        constructorBurgerActions.removeIngredient('non-existent-id');
      const newState = constructorBurgerSlice.reducer(state, removeAction);

      expect(newState.items.ingredients).toHaveLength(2);
    });
  });

  describe('moveIngredientUp', () => {
    it('должен перемещать начинку вверх', () => {
      const initialStateWithIngredients = constructorWithMultipleIngredients;
      // Перемещаем второй элемент вверх
      const ingredientId = initialStateWithIngredients.items.ingredients[1].id;
      const action = constructorBurgerActions.moveIngredientUp(ingredientId);
      const newState = constructorBurgerSlice.reducer(
        initialStateWithIngredients,
        action
      );
      // Проверяем что элементы поменялись местами
      expect(newState.items.ingredients[0].id).toBe('ingredient-2');
      expect(newState.items.ingredients[1].id).toBe('ingredient-1');
      expect(newState.items.ingredients[2].id).toBe('ingredient-3');
    });

    it('не должен перемещать первую начинку вверх', () => {
      const initialStateWithIngredients = constructorWithMultipleIngredients;
      // Пытаемся переместить первый элемент вверх
      const ingredientId = initialStateWithIngredients.items.ingredients[0].id;
      const action = constructorBurgerActions.moveIngredientUp(ingredientId);
      const newState = constructorBurgerSlice.reducer(
        initialStateWithIngredients,
        action
      );

      expect(newState.items.ingredients[0].id).toBe('ingredient-1');
      expect(newState.items.ingredients[1].id).toBe('ingredient-2');
      expect(newState.items.ingredients[2].id).toBe('ingredient-3');
    });
  });

  describe('moveIngredientDown', () => {
    it('должен перемещать начинку вниз', () => {
      const initialStateWithIngredients = constructorWithMultipleIngredients;

      // Перемещаем первый элемент вниз
      const ingredientId = initialStateWithIngredients.items.ingredients[0].id;
      const action = constructorBurgerActions.moveIngredientDown(ingredientId);
      const newState = constructorBurgerSlice.reducer(
        initialStateWithIngredients,
        action
      );

      // Проверяем что элементы поменялись местами
      expect(newState.items.ingredients[0].id).toBe('ingredient-2');
      expect(newState.items.ingredients[1].id).toBe('ingredient-1');
      expect(newState.items.ingredients[2].id).toBe('ingredient-3');
    });

    it('не должен перемещать последнюю начинку вниз', () => {
      const initialStateWithIngredients = constructorWithMultipleIngredients;

      // Пытаемся переместить последний элемент вниз
      const ingredientId = initialStateWithIngredients.items.ingredients[2].id;
      const action = constructorBurgerActions.moveIngredientDown(ingredientId);
      const newState = constructorBurgerSlice.reducer(
        initialStateWithIngredients,
        action
      );

      expect(newState.items.ingredients[0].id).toBe('ingredient-1');
      expect(newState.items.ingredients[1].id).toBe('ingredient-2');
      expect(newState.items.ingredients[2].id).toBe('ingredient-3');
    });
  });

  describe('clearConstructor', () => {
    it('должен полностью очищать конструктор', () => {
      const state = constructorBurgerSlice.reducer(fullConstructorState, {
        type: ''
      });

      expect(state.items.bun).not.toBeNull();
      expect(state.items.ingredients).toHaveLength(2);

      // Очищаем
      const action = constructorBurgerActions.clearConstructor();
      const clearedState = constructorBurgerSlice.reducer(state, action);

      expect(clearedState.items.bun).toBeNull();
      expect(clearedState.items.ingredients).toHaveLength(0);
      expect(clearedState).toEqual(initialState);
    });
  });
});
