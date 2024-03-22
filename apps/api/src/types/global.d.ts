import {UserModel} from "@it-shop/types";

declare global {
  namespace NodeJS {
    export interface ProcessEnv {
      PORT: string;
      DATABASE_URI: string;
      SECRET_REFRESH_TOKEN: string
      SECRET_ACCESS_TOKEN: string
      REFRESH_TOKEN_EXPIRE: string
      ACCESS_TOKEN_EXPIRE: string
    }
  }

  namespace Express {
    interface Request {
      user?: UserModel
    }
  }
}

interface ParsedQs {
    [key: string]: undefined | string | string[] | ParsedQs | ParsedQs[];
}
