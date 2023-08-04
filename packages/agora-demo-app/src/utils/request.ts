import axios from 'axios';
import { UserApi } from '../api/user';
import { indexUrl } from './';
import { token } from './token';

export interface Response<T = unknown> {
  code: string;
  msg: string;
  data: T;
}

const maxRetryTimes = 1;
const retryDelay = 300;

export const request = axios.create();

request.interceptors.request.use(function (config) {
  if (token.accessToken) {
    config.headers['Authorization'] = `Bearer ${token.accessToken}`;
  }
  return config;
});

request.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    // refreshToken接口不会重试
    if (error.config.url.includes('/refresh/refreshToken')) {
      return Promise.reject(error);
    }
    if (error.response.status === 401) {
      const { retryTimes = 0 } = error.config;
      if (retryTimes < maxRetryTimes && token.refreshToken) {
        console.log('try to refresh token');
        return UserApi.shared
          .refreshToken(token.refreshToken)
          .then((response) => {
            const {
              data: { data },
            } = response;

            token.refreshToken = data.refreshToken;
            token.accessToken = data.accessToken;
            error.config.retryTimes = retryTimes + 1;

            const delay = new Promise((resolve) => {
              setTimeout(() => {
                resolve({});
              }, retryDelay);
            });
            return delay.then(() => {
              return request(error.config);
            });
          })
          .catch((refreshTokenError) => {
            console.error('refreshTokenError', refreshTokenError);
            // refreshToken 接口报错，直接登出。
            window.location.replace(`${indexUrl}#/logout`);
          });
      } else {
        console.log(
          'cannot refresh token, retryTimes:',
          retryTimes,
          ', refreshToken:',
          token.refreshToken,
        );
        window.location.replace(`${indexUrl}#/logout`);
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  },
);
