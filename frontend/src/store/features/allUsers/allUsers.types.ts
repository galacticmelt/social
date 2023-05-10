import { User } from '../../../shared/types';

export type AllUsersState = {
  allUsers: User[];
  allUsersLoading: boolean;
  allUsersError: {
    status: boolean;
    value: null | any;
  };
};
