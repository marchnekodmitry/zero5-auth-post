import axios from 'axios';

import { getAccessToken } from '@/utils/tokens';

const instance = axios.create({
  baseURL: process.env.BASE_URL,
});

instance.interceptors.request.use(
  (config) => {
    const accessToken = getAccessToken();

    // eslint-disable-next-line no-param-reassign
    config.headers.authorization = `Bearer ${accessToken}`;

    return config;
  },
  (error) => Promise.reject(error),
);

export default instance;
