import instance from './instance';
import { ICredentials } from './models/auth';
import { IUser } from './models/user';

export const signUp = (data: ICredentials) => instance.post<{
  accessToken: string;
  refreshToken: string;
  user: IUser;
}>('/sign-up', data);

export const signIn = (data: Pick<ICredentials, 'email' | 'password'>) => instance.post<{
  accessToken: string;
  refreshToken: string;
}>('/sign-in', data);

export const zeroAuth = () => instance.get<{
  link: string;
}>('/zero/auth');
