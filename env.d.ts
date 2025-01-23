declare namespace NodeJS {
  export interface ProcessEnv {
    MONGO_URL: string;
    MONGO_URL_TEST: string;
    PORT: string;
    REDIS_SERVER: string;
    ORIGIN: string;
    REFRESH_TOKEN_SECRET: string;
    ACCESS_TOKEN_SECRET: string;
    AWS_SECRET_ACCESS_KEY: string;
    AWS_ACCESS_KEY_ID: string;
    RESTRICTED_ROUTE: string;
    EMAIL_USER_NAME: string;
    EMAIL_PASSWORD: string;
    FRONT_URL: string;
    PASS_LIMIT_BY_IP_DAY: string;
    PASS_LIMIT_BY_EMAIL_HOUR: string;
    GOOGLE_API_KEY: string;
    GOOGLE_API_SECRET: string;
    RABBIT_MQ_URL: string;
    RABBIT_TOKEN: string;
    UserSms: string;
    PasswordSms: string;
  }
}
