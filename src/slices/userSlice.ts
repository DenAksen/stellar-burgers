import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { USER_SLICE_NAME } from './sliceNames';
import { RequestStatus, TUser } from '@utils-types';
import {
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  TLoginData,
  TRegisterData,
  updateUserApi
} from '@api';
import { deleteCookie, setCookie } from '../utils/cookie';

export interface UserState {
  userData: TUser | null;
  authCheck: boolean;
  requestStatus: RequestStatus;
  errorText: string;
}

const initialState: UserState = {
  userData: null,
  authCheck: false,
  requestStatus: RequestStatus.Idle,
  errorText: ''
};

export const fetchUserThunk = createAsyncThunk(
  `${USER_SLICE_NAME}/fetchUser`,
  getUserApi
);

export const loginUserThunk = createAsyncThunk(
  `${USER_SLICE_NAME}/loginUser`,
  async (dataUser: TLoginData) => {
    const data = await loginUserApi(dataUser);
    setCookie('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    return data;
  }
);

export const registerUserThunk = createAsyncThunk(
  `${USER_SLICE_NAME}/registerUser`,
  async (dataUser: TRegisterData) => {
    const data = await registerUserApi(dataUser);
    setCookie('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    return data;
  }
);

export const updateUserThunk = createAsyncThunk(
  `${USER_SLICE_NAME}/updateUser`,
  async (dataUpdate: TRegisterData) => {
    const data = await updateUserApi(dataUpdate);
    return data;
  }
);

export const logoutThunk = createAsyncThunk(
  `${USER_SLICE_NAME}/logout`,
  logoutApi
);

const userSlice = createSlice({
  name: USER_SLICE_NAME,
  initialState,
  reducers: {
    setCheckUserAuth: (state) => {
      state.authCheck = true;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserThunk.pending, (state) => {
        state.requestStatus = RequestStatus.Loading;
        state.errorText = '';
      })
      .addCase(fetchUserThunk.fulfilled, (state, action) => {
        state.userData = action.payload.user;
        state.authCheck = true;
        state.requestStatus = RequestStatus.Success;
      })
      .addCase(fetchUserThunk.rejected, (state) => {
        state.requestStatus = RequestStatus.Failed;
        state.authCheck = true;
      })
      .addCase(registerUserThunk.pending, (state) => {
        state.requestStatus = RequestStatus.Loading;
        state.errorText = '';
      })
      .addCase(registerUserThunk.fulfilled, (state, action) => {
        state.userData = action.payload.user;
        state.requestStatus = RequestStatus.Success;
        state.errorText = '';
      })
      .addCase(registerUserThunk.rejected, (state) => {
        state.requestStatus = RequestStatus.Failed;
        state.errorText = 'Ошибка регистрации';
      })
      .addCase(loginUserThunk.pending, (state) => {
        state.requestStatus = RequestStatus.Loading;
        state.errorText = '';
      })
      .addCase(loginUserThunk.fulfilled, (state, action) => {
        state.userData = action.payload.user;
        state.requestStatus = RequestStatus.Success;
        state.errorText = '';
      })
      .addCase(loginUserThunk.rejected, (state) => {
        state.requestStatus = RequestStatus.Failed;
        state.errorText = 'Ошибка авторизации';
      })
      .addCase(updateUserThunk.pending, (state) => {
        state.requestStatus = RequestStatus.Loading;
        state.errorText = '';
      })
      .addCase(updateUserThunk.fulfilled, (state, action) => {
        state.userData = action.payload.user;
        state.requestStatus = RequestStatus.Success;
        state.errorText = '';
      })
      .addCase(updateUserThunk.rejected, (state) => {
        state.requestStatus = RequestStatus.Failed;
        state.errorText = 'Ошибка обновления данных';
      })
      .addCase(logoutThunk.pending, (state) => {
        state.requestStatus = RequestStatus.Loading;
        state.errorText = '';
      })
      .addCase(logoutThunk.fulfilled, (state) => {
        state.userData = null;
        state.requestStatus = RequestStatus.Success;
        localStorage.removeItem('refreshToken');
        deleteCookie('accessToken');
        state.errorText = '';
      })
      .addCase(logoutThunk.rejected, (state) => {
        state.requestStatus = RequestStatus.Failed;
        state.errorText = 'Ошибка logout';
      });
  },
  selectors: {
    selectUser: (state) => state.userData,
    selectError: (state) => state.errorText,
    selectAuthCheck: (state) => state.authCheck,
    selectUserName: (state) => state.userData?.name
  }
});

export const userSelectors = userSlice.selectors;
export default userSlice;
