export const API_ROUTES = {
  AUTH_ROOT: `${import.meta.env.VITE_BASE_URL}/auth/`,
  REFRESH_ACCESS: `${import.meta.env.VITE_BASE_URL}/auth/refresh-access`,
  USERS_ROOT: `${import.meta.env.VITE_BASE_URL}/users/`,
  CHATS_GET_BY_USER: `${import.meta.env.VITE_BASE_URL}/chats/getByUser/`,
  CHATS_ROOT: `${import.meta.env.VITE_BASE_URL}/chats/`,
  MESSAGES_GET_BY_CHAT: `${import.meta.env.VITE_BASE_URL}/messages/getByChat/`,
  MESSAGES_ROOT: `${import.meta.env.VITE_BASE_URL}/messages/`,
  POSTS_ROOT: `${import.meta.env.VITE_BASE_URL}/posts/`,
  POSTS_GET_BY_USER: `${import.meta.env.VITE_BASE_URL}/posts/getByUser/`,
  POSTS_GET_BY_FRIENDS: `${import.meta.env.VITE_BASE_URL}/posts/getByFriends/`
};

export const DEFAULT_VALUES = {
  EMPTY_STRING: '',
  MOCK_ID_FOR_CHAT_INIT: '000000000000000000000000'
};
