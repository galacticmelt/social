declare global {
  namespace NodeJS {
    interface ProcessEnv {
      MONGO_CONNECT: string;
      PORT: string;
      ALLOWED_ORIGINS: string;
      JWT_ACCESS_SIGN: string;
      JWT_REFRESH_SIGN: string;
    }
  }
}

export {};