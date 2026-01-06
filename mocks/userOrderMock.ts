import { RequestStatus, TOrder } from '../src/utils/types';

// Моковые заказы
export const mockUserOrder1: TOrder = {
  _id: 'user-order-1',
  status: 'done',
  name: 'Мой Space бургер',
  createdAt: '2024-01-01T10:00:00.000Z',
  updatedAt: '2024-01-01T10:30:00.000Z',
  number: 12345,
  ingredients: [
    '60d3b41abdacab0026a733c6',
    '60d3b41abdacab0026a733cb',
    '60d3b41abdacab0026a733cc'
  ]
};

export const mockUserOrder2: TOrder = {
  _id: 'user-order-2',
  status: 'done',
  name: 'Мой Лунный бургер',
  createdAt: '2024-01-02T11:00:00.000Z',
  updatedAt: '2024-01-02T11:15:00.000Z',
  number: 12346,
  ingredients: ['60d3b41abdacab0026a733c7', '60d3b41abdacab0026a733c9']
};

export const mockUserOrder3: TOrder = {
  _id: 'user-order-3',
  status: 'done',
  name: 'Мой Галактический бургер',
  createdAt: '2024-01-03T12:00:00.000Z',
  updatedAt: '2024-01-03T12:20:00.000Z',
  number: 12347,
  ingredients: [
    '60d3b41abdacab0026a733c6',
    '60d3b41abdacab0026a733ca',
    '60d3b41abdacab0026a733c6'
  ]
};

// Состояния слайса
export const initialStateUserOrder = {
  orderData: [],
  requestStatus: RequestStatus.Idle,
  orderRequest: false,
  orderModalData: null,
  orderInfoData: null
};

export const withOrdersState = {
  orderData: [mockUserOrder1, mockUserOrder2, mockUserOrder3],
  requestStatus: RequestStatus.Success,
  orderRequest: false,
  orderModalData: null,
  orderInfoData: null
};

// Для теста очистки
export const stateBeforeClear = {
  orderData: [],
  requestStatus: RequestStatus.Success,
  orderRequest: false,
  orderModalData: mockUserOrder1,
  orderInfoData: null
};

export const stateAfterClear = {
  orderData: [],
  requestStatus: RequestStatus.Success,
  orderRequest: false,
  orderModalData: null,
  orderInfoData: null
};
