import { CookieOptions, Response } from 'express';

export class CookieService {
    options: CookieOptions;

    constructor(options: CookieOptions) {
        this.options = options;
    }

    public set(response: Response, name: string, value: string) {
        response.cookie(name, value, this.options);
    }

    public clear(response: Response, name: string) {
        response.clearCookie(name, this.options);
    }
}
