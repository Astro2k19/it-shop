declare namespace NodeJS {
    export interface ProcessEnv {
        PORT: string;
        DATABASE_URI: string;
        SECRET_REFRESH_TOKEN: string
        SECRET_ACCESS_TOKEN: string
    }
}

interface ParsedQs {
    [key: string]: undefined | string | string[] | ParsedQs | ParsedQs[];
}
