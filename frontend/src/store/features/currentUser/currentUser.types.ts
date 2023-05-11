import { Friend } from '../../../shared/types';

export type CurrentUserState = {
  userId: string;
  firstName: string;
  lastName: string;
  friends: Friend[];
  userLoading: boolean;
  userError: {
    status: boolean;
    value: null | any;
  };
};
