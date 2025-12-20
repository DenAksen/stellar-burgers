import {
  createAsyncThunk,
  createSlice,
  isPending,
  isRejected
} from '@reduxjs/toolkit';
import { USER_ORDER_SLICE_NAME } from './sliceNames';
import { RequestStatus, TOrder } from '@utils-types';
import { getOrderByNumberApi, getOrdersApi, orderBurgerApi } from '@api';

export interface UserState {
  orderData: TOrder[];
  requestStatus: RequestStatus;
  orderRequest: boolean;
  orderModalData: TOrder | null;
  orderInfoData: TOrder | null;
}

const initialState: UserState = {
  orderData: [],
  requestStatus: RequestStatus.Idle,
  orderRequest: false,
  orderModalData: null,
  orderInfoData: null
};

export const getOrderByNumberThunk = createAsyncThunk(
  `${USER_ORDER_SLICE_NAME}/getOrderByNumber`,
  async (number: number) => {
    const data = await getOrderByNumberApi(number);
    return data;
  }
);

export const getOrdersThunk = createAsyncThunk(
  `${USER_ORDER_SLICE_NAME}/getOrders`,
  getOrdersApi
);

export const orderBurgerThunk = createAsyncThunk(
  `${USER_ORDER_SLICE_NAME}/orderBurger`,
  async (newOrderData: string[]) => {
    const data = await orderBurgerApi(newOrderData);
    return data;
  }
);

const userOderSlice = createSlice({
  name: USER_ORDER_SLICE_NAME,
  initialState,
  reducers: {
    clearNewOrerData: (state) => {
      state.orderModalData = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrdersThunk.fulfilled, (state, action) => {
        state.orderData = action.payload;
        state.requestStatus = RequestStatus.Success;
      })
      .addCase(orderBurgerThunk.fulfilled, (state, action) => {
        state.orderModalData = action.payload.order;
        state.orderRequest = false;
      })
      .addCase(getOrderByNumberThunk.fulfilled, (state, action) => {
        state.orderInfoData = action.payload.orders[0];
        state.orderRequest = false;
      })
      .addMatcher(
        isPending(getOrdersThunk, orderBurgerThunk, getOrderByNumberThunk),
        (state) => {
          state.orderRequest = true;
        }
      )
      .addMatcher(
        isRejected(getOrdersThunk, orderBurgerThunk, getOrderByNumberThunk),
        (state) => {
          state.orderRequest = false;
        }
      );
  },
  selectors: {
    selectUserOrders: (state) => state.orderData,
    selectOrderRequest: (state) => state.orderRequest,
    selectorderModalData: (state) => state.orderModalData,
    selectorOrderInfoData: (state) => state.orderInfoData
  }
});

export const userOderSelectors = userOderSlice.selectors;
export const UserOrderActions = userOderSlice.actions;
export default userOderSlice;
