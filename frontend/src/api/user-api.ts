import { API_ROUTES } from '../shared/constants';
import { SignUpData, UserUpdate } from '../shared/types';
import { basicRequest, bearerRequest } from './templates';

export const registerUser = async (user: SignUpData) => {
  return await basicRequest
    .post(API_ROUTES.USERS_ROOT, {
      body: JSON.stringify(user)
    })
    .json();
};

export const fetchUserById = async (id: string) => {
  return await bearerRequest.get(API_ROUTES.USERS_ROOT + id).json();
};

export const fetchAllUsers = async () => {
  return await bearerRequest.get(API_ROUTES.USERS_ROOT).json();
};

export const updateUser = async (id: string, update: UserUpdate) => {
  return await bearerRequest
    .patch(API_ROUTES.USERS_ROOT + id, {
      body: JSON.stringify(update)
    })
    .json();
};
