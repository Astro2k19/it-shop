declare namespace NodeJS {
    export interface ProcessEnv {
        PORT: string;
        NODE_ENV: string;
        LOCAL_DATABASE_URI: string;
        DATABASE_URI: string;
    }
}

interface ParsedQs {
    [key: string]: undefined | string | string[] | ParsedQs | ParsedQs[];
}
