export interface LogInPayload {
  accessToken: string;
  userId: string;
}

export type AuthState = {
  loggedUserId: string;
  authLoading: boolean;
  authError: {
    status: boolean;
    value: null | string;
  };
};
