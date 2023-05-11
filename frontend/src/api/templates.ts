import ky from 'ky';
import { refreshAccess } from './auth-api';

export const basicRequest = ky.create({
  headers: {
    'Content-Type': 'application/json'
  },
  hooks: {
    beforeError: [
      async (err) => {
        const { response } = err;
        if (response) {
          const json = await response.json();
          err.message = `${response.status}: ${json.error}`;
        }
        return err;
      }
    ]
  }
});

export const bearerRequest = basicRequest.extend({
  retry: {
    methods: ['get', 'post', 'delete'],
    statusCodes: [401],
    limit: 5
  },
  hooks: {
    beforeRequest: [
      (request) => {
        const token = sessionStorage.getItem('accessToken');
        request.headers.set('Authorization', `Bearer ${token}`);
      }
    ],
    beforeRetry: [
      async () => {
        const data = await refreshAccess();
        sessionStorage.setItem('accessToken', data.accessToken);
      }
    ]
  }
});
