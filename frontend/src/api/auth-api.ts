import { API_ROUTES } from '../shared/constants';
import { LogInData } from '../shared/types';
import { basicRequest } from './templates';

export const fetchAuthData = async (user: LogInData) => {
  return await basicRequest
    .post(API_ROUTES.AUTH_ROOT, {
      credentials: 'include',
      body: JSON.stringify(user)
    })
    .json();
};

export const refreshAccess = async () => {
  return await basicRequest
    .post(API_ROUTES.REFRESH_ACCESS, {
      credentials: 'include'
    })
    .json();
};
