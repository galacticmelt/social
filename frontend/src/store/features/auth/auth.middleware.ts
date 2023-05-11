import { Middleware } from 'redux';
import { authActions } from './auth.slice';

export const authMiddleware: Middleware = (store) => (next) => (action) => {
  if (authActions.logIn.fulfilled.match(action)) {
    sessionStorage.setItem('accessToken', action.payload.accessToken);
    sessionStorage.setItem('userId', action.payload.userId);
  } else if (authActions.logOut.match(action)) {
    sessionStorage.removeItem('accessToken');
    sessionStorage.removeItem('userId');
  }
  return next(action);
};
