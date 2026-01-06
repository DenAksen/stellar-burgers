import { RequestStatus } from '../src/utils/types';
import {
  emptyConstructorState,
  fullConstructorState
} from './constructorBurgerMock';
import { initialStateFeeds, loadedStateFeeds } from './feedsMock';
import { ingredientsMock } from './ingredientsMock';
import { userMock } from './userMock';
import { initialStateUserOrder, withOrdersState } from './userOrderMock';

// Состояние с данными
export const stateLoaded = {
  burger: {
    ingredients: ingredientsMock.data,
    ingredientsLoading: false
  },
  constructorBurger: fullConstructorState,
  feeds: loadedStateFeeds,
  user: {
    userData: userMock.user,
    authCheck: true,
    requestStatus: RequestStatus.Idle,
    errorText: ''
  },
  userOrder: withOrdersState
};

// Начальное состояние
export const stateInitial = {
  burger: {
    ingredients: [],
    ingredientsLoading: false
  },
  constructorBurger: emptyConstructorState,
  feeds: initialStateFeeds,
  user: {
    userData: userMock.user,
    authCheck: true,
    requestStatus: RequestStatus.Idle,
    errorText: ''
  },
  userOrder: initialStateUserOrder
};
