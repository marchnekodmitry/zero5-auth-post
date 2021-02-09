import { createActionCreators } from 'immer-reducer';

import { ICredentials } from '@/api/models/auth';
import { signIn, signUp } from '@/api/auth';
import { me } from '@/api/user';

import { setAccessToken, setRefreshToken } from '@/utils/tokens';

import { AuthReducer } from '@/store/reducers/auth';
import { AsyncAction } from './common';

export const authActions = createActionCreators(AuthReducer);

export type AuthActions =
  | ReturnType<typeof authActions.setIsPending>
  | ReturnType<typeof authActions.setIsResolved>
  | ReturnType<typeof authActions.setIsRejected>
  | ReturnType<typeof authActions.setUser>;

export const signUpAction = (data: ICredentials): AsyncAction => async (dispatch) => {
  try {
    dispatch(authActions.setIsPending());

    const { data: responseData } = await signUp(data);

    setAccessToken(responseData.accessToken);
    setRefreshToken(responseData.refreshToken);

    dispatch(authActions.setIsResolved());
  } catch (e) {
    dispatch(authActions.setIsRejected());
  }
};

export const signInAction = (data: Pick<ICredentials, 'email' | 'password'>): AsyncAction => async (dispatch) => {
  try {
    dispatch(authActions.setIsPending());

    const { data: responseData } = await signIn(data);

    setAccessToken(responseData.accessToken);
    setRefreshToken(responseData.refreshToken);

    dispatch(authActions.setIsResolved());
  } catch (e) {
    dispatch(authActions.setIsRejected());
  }
};

export const meAction = (): AsyncAction => async (dispatch) => {
  try {
    const { data: responseData } = await me();

    dispatch(authActions.setUser(responseData));

    return responseData;
  } catch (e) {
    return e;
  }
};
