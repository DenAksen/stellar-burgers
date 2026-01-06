import userSlice from '../userSlice';
import { mockResponseAuth, userMock } from '../../../mocks/userMock';
import { RequestStatus } from '@utils-types';

beforeAll(() => {
  jest.mock('@api', () => ({
    getUserApi: jest.fn(),
    loginUserApi: jest.fn(),
    registerUserApi: jest.fn(),
    updateUserApi: jest.fn(),
    logoutApi: jest.fn()
  }));

  jest.mock('../../utils/cookie', () => ({
    setCookie: jest.fn(),
    deleteCookie: jest.fn()
  }));
});

afterAll(() => {
  jest.unmock('@api');
  jest.unmock('../../utils/cookie');
});

describe('userSlice', () => {
  const initialState = {
    userData: null,
    authCheck: false,
    requestStatus: RequestStatus.Idle,
    errorText: ''
  };

  it('должен возвращать начальное состояние', () => {
    const state = userSlice.reducer(undefined, { type: '@@INIT' });
    expect(state).toEqual(initialState);
  });

  describe('fetchUserThunk', () => {
    it('должен устанавливать requestStatus в Loading при pending', () => {
      const action = { type: 'user/fetchUser/pending' };
      const state = userSlice.reducer(initialState, action);

      expect(state.requestStatus).toBe(RequestStatus.Loading);
      expect(state.errorText).toBe('');
    });

    it('должен записывать данные пользователя при fulfilled', () => {
      const action = {
        type: 'user/fetchUser/fulfilled',
        payload: userMock
      };

      const state = userSlice.reducer(initialState, action);

      expect(state.userData).toEqual(userMock.user);
      expect(state.authCheck).toBe(true);
      expect(state.requestStatus).toBe(RequestStatus.Success);
    });

    it('должен устанавливать authCheck в true и статус Failed при rejected', () => {
      const action = { type: 'user/fetchUser/rejected' };
      const state = userSlice.reducer(initialState, action);

      expect(state.authCheck).toBe(true);
      expect(state.requestStatus).toBe(RequestStatus.Failed);
    });
  });

  describe('registerUserThunk', () => {
    it('должен устанавливать requestStatus в Loading при pending', () => {
      const action = { type: 'user/registerUser/pending' };
      const state = userSlice.reducer(initialState, action);

      expect(state.requestStatus).toBe(RequestStatus.Loading);
      expect(state.errorText).toBe('');
    });

    it('должен записывать данные пользователя при fulfilled', () => {
      const action = {
        type: 'user/registerUser/fulfilled',
        payload: mockResponseAuth
      };

      const state = userSlice.reducer(initialState, action);

      expect(state.userData).toEqual(mockResponseAuth.user);
      expect(state.requestStatus).toBe(RequestStatus.Success);
      expect(state.errorText).toBe('');
    });

    it('должен устанавливать ошибку при rejected', () => {
      const action = { type: 'user/registerUser/rejected' };
      const state = userSlice.reducer(initialState, action);

      expect(state.requestStatus).toBe(RequestStatus.Failed);
      expect(state.errorText).toBe('Ошибка регистрации');
    });
  });

  describe('loginUserThunk', () => {
    it('должен устанавливать requestStatus в Loading при pending', () => {
      const action = { type: 'user/loginUser/pending' };
      const state = userSlice.reducer(initialState, action);

      expect(state.requestStatus).toBe(RequestStatus.Loading);
      expect(state.errorText).toBe('');
    });

    it('должен записывать данные пользователя при fulfilled', () => {
      const action = {
        type: 'user/loginUser/fulfilled',
        payload: mockResponseAuth
      };

      const state = userSlice.reducer(initialState, action);

      expect(state.userData).toEqual(mockResponseAuth.user);
      expect(state.requestStatus).toBe(RequestStatus.Success);
      expect(state.errorText).toBe('');
    });

    it('должен устанавливать ошибку при rejected', () => {
      const action = { type: 'user/loginUser/rejected' };
      const state = userSlice.reducer(initialState, action);

      expect(state.requestStatus).toBe(RequestStatus.Failed);
      expect(state.errorText).toBe('Ошибка авторизации');
    });
  });

  describe('updateUserThunk', () => {
    it('должен устанавливать requestStatus в Loading при pending', () => {
      const action = { type: 'user/updateUser/pending' };
      const state = userSlice.reducer(initialState, action);

      expect(state.requestStatus).toBe(RequestStatus.Loading);
      expect(state.errorText).toBe('');
    });

    it('должен обновлять данные пользователя при fulfilled', () => {
      const updatedUser = { ...userMock.user, name: 'Updated User' };
      const action = {
        type: 'user/updateUser/fulfilled',
        payload: { user: updatedUser }
      };

      const state = userSlice.reducer(initialState, action);

      expect(state.userData).toEqual(updatedUser);
      expect(state.requestStatus).toBe(RequestStatus.Success);
      expect(state.errorText).toBe('');
    });

    it('должен устанавливать ошибку при rejected', () => {
      const action = { type: 'user/updateUser/rejected' };
      const state = userSlice.reducer(initialState, action);

      expect(state.requestStatus).toBe(RequestStatus.Failed);
      expect(state.errorText).toBe('Ошибка обновления данных');
    });
  });

  describe('logoutThunk', () => {
    it('должен устанавливать requestStatus в Loading при pending', () => {
      const action = { type: 'user/logout/pending' };
      const state = userSlice.reducer(initialState, action);

      expect(state.requestStatus).toBe(RequestStatus.Loading);
      expect(state.errorText).toBe('');
    });

    it('должен очищать данные пользователя при fulfilled', () => {
      const loggedInState = {
        ...initialState,
        userData: userMock.user,
        authCheck: true
      };

      const action = { type: 'user/logout/fulfilled' };
      const state = userSlice.reducer(loggedInState, action);

      expect(state.userData).toBeNull();
      expect(state.errorText).toBe('');
    });

    it('должен устанавливать ошибку при rejected', () => {
      const action = { type: 'user/logout/rejected' };
      const state = userSlice.reducer(initialState, action);

      expect(state.requestStatus).toBe(RequestStatus.Failed);
      expect(state.errorText).toBe('Ошибка logout');
    });
  });

  describe('reducer setCheckUserAuth', () => {
    it('должен устанавливать authCheck в true', () => {
      const action = { type: 'user/setCheckUserAuth' };
      const state = userSlice.reducer(initialState, action);

      expect(state.authCheck).toBe(true);
    });
  });
});
