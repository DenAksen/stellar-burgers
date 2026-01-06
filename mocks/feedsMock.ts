import { TOrder, TOrdersData } from '../src/utils/types';

// Моковые заказы
export const mockOrder1: TOrder = {
  _id: 'order-1',
  status: 'done',
  name: 'Space флюоресцентный бургер',
  createdAt: '2024-01-01T12:00:00.000Z',
  updatedAt: '2024-01-01T12:30:00.000Z',
  number: 12345,
  ingredients: [
    '60d3b41abdacab0026a733c6',
    '60d3b41abdacab0026a733cb',
    '60d3b41abdacab0026a733cc'
  ]
};

export const mockOrder2: TOrder = {
  _id: 'order-2',
  status: 'done',
  name: 'Лунный краторный бургер',
  createdAt: '2024-01-01T13:00:00.000Z',
  updatedAt: '2024-01-01T13:15:00.000Z',
  number: 12346,
  ingredients: [
    '60d3b41abdacab0026a733c7',
    '60d3b41abdacab0026a733c9',
    '60d3b41abdacab0026a733ce'
  ]
};

export const mockOrder3: TOrder = {
  _id: 'order-3',
  status: 'done',
  name: 'Галактический spicy бургер',
  createdAt: '2024-01-01T14:00:00.000Z',
  updatedAt: '2024-01-01T14:20:00.000Z',
  number: 12347,
  ingredients: [
    '60d3b41abdacab0026a733c6',
    '60d3b41abdacab0026a733ca',
    '60d3b41abdacab0026a733cf'
  ]
};

export const emptyFeedsData: TOrdersData = {
  orders: [],
  total: 0,
  totalToday: 0
};

export const fullFeedsData: TOrdersData = {
  orders: [mockOrder1, mockOrder2, mockOrder3],
  total: 150,
  totalToday: 3
};

// Состояния слайса
export const initialStateFeeds = {
  feedsLoading: false,
  feedsData: emptyFeedsData
};

export const loadingStateFeeds = {
  feedsLoading: true,
  feedsData: emptyFeedsData
};

export const loadedStateFeeds = {
  feedsLoading: false,
  feedsData: fullFeedsData
};
