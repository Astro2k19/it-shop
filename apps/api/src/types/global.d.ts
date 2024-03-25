import {UserModel} from "@it-shop/types";

declare global {
  namespace NodeJS {
    export interface ProcessEnv {
      PORT: string;
      CLIENT_URL: string;
      DATABASE_URI: string;

      SECRET_REFRESH_TOKEN: string;
      SECRET_ACCESS_TOKEN: string;
      REFRESH_TOKEN_EXPIRE: string;
      ACCESS_TOKEN_EXPIRE: string;

      SMTP_HOST: string;
      SMTP_PORT: string;
      SMTP_EMAIL: string;
      SMTP_PASS: string;
      SMTP_FROM_NAME: string;
      SMTP_FROM_EMAIL: string;
    }
  }

  namespace Express {
    interface Request {
      user?: UserModel;
    }
  }
}

interface ParsedQs {
    [key: string]: undefined | string | string[] | ParsedQs | ParsedQs[];
}
