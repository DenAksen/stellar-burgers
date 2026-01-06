import userOderSlice, {
  getOrdersThunk,
  orderBurgerThunk,
  getOrderByNumberThunk,
  UserOrderActions
} from '../userOrdersSlise';
import {
  initialStateUserOrder,
  stateBeforeClear,
  stateAfterClear,
  mockUserOrder1,
  mockUserOrder2
} from '../../../mocks/userOrderMock';
import { RequestStatus } from '@utils-types';

beforeAll(() => {
  jest.mock('@api', () => ({
    getOrdersApi: jest.fn(),
    orderBurgerApi: jest.fn(),
    getOrderByNumberApi: jest.fn()
  }));
});

afterAll(() => {
  jest.unmock('@api');
});

describe('userOrdersSlise', () => {
  const initialState = initialStateUserOrder;

  it('должен возвращать начальное состояние', () => {
    const state = userOderSlice.reducer(undefined, { type: '@@INIT' });
    expect(state).toEqual(initialState);
  });

  describe('getOrdersThunk', () => {
    it('должен устанавливать orderRequest в true при pending', () => {
      const action = { type: getOrdersThunk.pending.type };
      const state = userOderSlice.reducer(initialState, action);

      expect(state.orderRequest).toBe(true);
    });

    it('должен записывать заказы при fulfilled', () => {
      const orders = [mockUserOrder1, mockUserOrder2];
      const action = {
        type: getOrdersThunk.fulfilled.type,
        payload: orders
      };

      const state = userOderSlice.reducer(initialState, action);

      expect(state.orderData).toEqual(orders);
      expect(state.requestStatus).toBe(RequestStatus.Success);
      expect(state.orderRequest).toBe(false);
    });

    it('должен устанавливать orderRequest в false при rejected', () => {
      const loadingState = { ...initialState, orderRequest: true };
      const action = { type: getOrdersThunk.rejected.type };
      const state = userOderSlice.reducer(loadingState, action);

      expect(state.orderRequest).toBe(false);
    });
  });

  describe('orderBurgerThunk', () => {
    it('должен устанавливать orderRequest в true при pending ', () => {
      const action = { type: orderBurgerThunk.pending.type };
      const state = userOderSlice.reducer(initialState, action);

      expect(state.orderRequest).toBe(true);
    });

    it('должен записывать orderModalData при fulfilled', () => {
      const orderResponse = {
        success: true,
        order: mockUserOrder1,
        name: 'Флюоресцентный бургер'
      };

      const action = {
        type: orderBurgerThunk.fulfilled.type,
        payload: orderResponse
      };

      const state = userOderSlice.reducer(initialState, action);

      expect(state.orderModalData).toEqual(mockUserOrder1);
      expect(state.orderRequest).toBe(false);
    });

    it('должен устанавливать orderRequest в false при rejected', () => {
      const loadingState = { ...initialState, orderRequest: true };
      const action = { type: orderBurgerThunk.rejected.type };
      const state = userOderSlice.reducer(loadingState, action);

      expect(state.orderRequest).toBe(false);
    });
  });

  describe('getOrderByNumberThunk', () => {
    it('должен устанавливать orderRequest в true при pending', () => {
      const action = { type: getOrderByNumberThunk.pending.type };
      const state = userOderSlice.reducer(initialState, action);

      expect(state.orderRequest).toBe(true);
    });

    it('должен записывать orderInfoData при fulfilled', () => {
      const apiResponse = {
        success: true,
        orders: [mockUserOrder1]
      };

      const action = {
        type: getOrderByNumberThunk.fulfilled.type,
        payload: apiResponse
      };

      const state = userOderSlice.reducer(initialState, action);

      expect(state.orderInfoData).toEqual(mockUserOrder1);
      expect(state.orderRequest).toBe(false);
    });

    it('должен устанавливать orderRequest в false при rejected ', () => {
      const loadingState = { ...initialState, orderRequest: true };
      const action = { type: getOrderByNumberThunk.rejected.type };
      const state = userOderSlice.reducer(loadingState, action);

      expect(state.orderRequest).toBe(false);
    });
  });

  describe('clearNewOrerData', () => {
    it('должен очищать orderModalData', () => {
      const action = UserOrderActions.clearNewOrerData();
      const state = userOderSlice.reducer(stateBeforeClear, action);

      expect(state.orderModalData).toBeNull();
      expect(state).toEqual(stateAfterClear);
    });
  });
});
