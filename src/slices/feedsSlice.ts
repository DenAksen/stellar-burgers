import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { BURGER_SLICE_NAME, FEEDS_SLICE_NAME } from './sliceNames';
import { TOrdersData } from '@utils-types';
import { getFeedsApi } from '@api';

export interface FeedState {
  feedsLoading: boolean;
  feedsData: TOrdersData;
}

const initialState: FeedState = {
  feedsLoading: false,
  feedsData: {
    orders: [],
    total: 0,
    totalToday: 0
  }
};

export const getFeedsThunk = createAsyncThunk(
  `${BURGER_SLICE_NAME}/getFeeds`,
  getFeedsApi
);

const feedsSlice = createSlice({
  name: FEEDS_SLICE_NAME,
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFeedsThunk.pending, (state) => {
        state.feedsLoading = true;
      })
      .addCase(getFeedsThunk.fulfilled, (state, action) => {
        state.feedsData = action.payload;
        state.feedsLoading = false;
      });
  },
  selectors: {
    selectFeeds: (state) => state.feedsData,
    selectFeedsLoading: (state) => state.feedsLoading,
    selectFeedsOrders: (state) => state.feedsData.orders
  }
});

export const feedsSelectors = feedsSlice.selectors;
export default feedsSlice;
