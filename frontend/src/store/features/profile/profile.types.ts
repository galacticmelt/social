import { Friend } from '../../../shared/types';

export type ProfileState = {
  profileUserId: string;
  firstName: string;
  lastName: string;
  friends: Friend[];
  profileLoading: boolean;
  profileError: {
    status: boolean;
    value: null | any;
  };
};
