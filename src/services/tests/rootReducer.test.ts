import { stateInitial } from '../../../mocks/storeStateMock';
import { rootReducer, RootState } from '../store';

describe('rootReducer', () => {
  it('должен правильно инициализироваться', () => {
    const state = rootReducer(undefined, { type: '@@INIT' }) as RootState;

    // Проверяем структуру
    expect(state).toHaveProperty('constructorBurger');
    expect(state).toHaveProperty('burger');
    expect(state).toHaveProperty('userOrder');
    expect(state).toHaveProperty('user');
    expect(state).toHaveProperty('feeds');

    // Проверяем начальные значения
    expect(state.burger).toEqual({
      ingredients: [],
      ingredientsLoading: false
    });

    expect(state.feeds).toEqual({
      feedsLoading: false,
      feedsData: {
        orders: [],
        total: 0,
        totalToday: 0
      }
    });

    expect(state.constructorBurger).toEqual({
      items: {
        bun: null,
        ingredients: []
      }
    });

    expect(state.user).toEqual({
      userData: null,
      authCheck: false,
      requestStatus: 'Idle',
      errorText: ''
    });

    expect(state.userOrder).toEqual({
      orderData: [],
      requestStatus: 'Idle',
      orderRequest: false,
      orderModalData: null,
      orderInfoData: null
    });
  });

  it('должен возвращать тот же state при неизвестном action', () => {
    const initialState = stateInitial;
    const action = { type: 'UNKNOWN_ACTION' };

    const newState = rootReducer(initialState, action);

    expect(newState).toBe(initialState);
  });
});
