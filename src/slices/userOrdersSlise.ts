import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { USER_ORDER_SLICE_NAME } from './sliceNames';
import { RequestStatus, TOrder } from '@utils-types';
import { getOrdersApi, orderBurgerApi } from '@api';
import { useSelector } from '../services/store';

export interface UserState {
  orderData: TOrder[];
  requestStatus: RequestStatus;
  orderRequest: boolean;
  orderModalData: TOrder | null;
}

const initialState: UserState = {
  orderData: [],
  requestStatus: RequestStatus.Idle,
  orderRequest: false,
  orderModalData: null
};

export const getOrdersThunk = createAsyncThunk(
  `${USER_ORDER_SLICE_NAME}/getOrders`,
  async () => {
    const data = await getOrdersApi();
    return data;
  }
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
      .addCase(getOrdersThunk.pending, (state) => {
        state.requestStatus = RequestStatus.Loading;
      })
      .addCase(getOrdersThunk.fulfilled, (state, action) => {
        state.orderData = action.payload;
        state.requestStatus = RequestStatus.Success;
      })
      .addCase(getOrdersThunk.rejected, (state) => {
        state.requestStatus = RequestStatus.Failed;
      })
      .addCase(orderBurgerThunk.pending, (state) => {
        state.orderRequest = true;
      })
      .addCase(orderBurgerThunk.fulfilled, (state, action) => {
        state.orderModalData = action.payload.order;
        state.orderRequest = false;
      })
      .addCase(orderBurgerThunk.rejected, (state) => {
        state.orderRequest = false;
      });
  },
  selectors: {
    selectUserOrders: (state) => state.orderData,
    selectOrderRequest: (state) => state.orderRequest,
    selectorderModalData: (state) => state.orderModalData
  }
});

export const userOderSelectors = userOderSlice.selectors;
export const UserOrderActions = userOderSlice.actions;
export default userOderSlice;
