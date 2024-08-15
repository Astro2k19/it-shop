import { Injectable } from '@nestjs/common';
import ms from 'ms';
import crypto from 'crypto';

@Injectable()
export class ResetTokenService {
    generate(length = 10): string {
        return crypto.randomBytes(length).toString('hex');
    }

    hash(token: string) {
        return crypto.createHash('sha256').update(token).digest('hex');
    }

    generateExpiry(duration: string) {
        return new Date(Date.now() + ms(duration));
    }

    async validate(token: string, hashedToken: string) {
        const hashedInputToken = this.hash(token);
        return hashedInputToken === hashedToken;
    }
}
