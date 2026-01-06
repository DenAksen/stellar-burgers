import feedsSlice, { getFeedsThunk } from '../feedsSlice';
import {
  emptyFeedsData,
  fullFeedsData,
  initialStateFeeds,
  loadingStateFeeds
} from '../../../mocks/feedsMock';

beforeAll(() => {
  jest.mock('@api', () => ({
    getFeedsApi: jest.fn(() => Promise.resolve(fullFeedsData))
  }));
});

afterAll(() => {
  jest.unmock('@api');
});

describe('feedsSlice', () => {
  const initialState = initialStateFeeds;

  it('должен возвращать начальное состояние', () => {
    const state = feedsSlice.reducer(undefined, { type: '@@INIT' });
    expect(state).toEqual(initialState);
  });

  describe('getFeedsThunk', () => {
    it('должен устанавливать feedsLoading в true при pending', () => {
      const action = { type: getFeedsThunk.pending.type };
      const state = feedsSlice.reducer(initialState, action);

      expect(state.feedsLoading).toBe(true);
      expect(state.feedsData).toEqual(emptyFeedsData);
    });

    it('должен записывать данные и устанавливать loading в false при fulfilled', () => {
      const action = {
        type: getFeedsThunk.fulfilled.type,
        payload: fullFeedsData
      };

      const state = feedsSlice.reducer(loadingStateFeeds, action);

      expect(state.feedsLoading).toBe(false);
      expect(state.feedsData).toEqual(fullFeedsData);
      expect(state.feedsData.orders).toHaveLength(3);
      expect(state.feedsData.total).toBe(150);
      expect(state.feedsData.totalToday).toBe(3);
    });

    it('должен устанавливать loading в false при rejected', () => {
      const action = { type: getFeedsThunk.rejected.type };
      const state = feedsSlice.reducer(loadingStateFeeds, action);

      expect(state.feedsLoading).toBe(false);
      expect(state.feedsData).toEqual(emptyFeedsData);
    });
  });
});
