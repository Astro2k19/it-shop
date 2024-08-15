import { Module } from '@nestjs/common';
import { JwtTokenService } from './jwt-token.service';
import { ResetTokenService } from './reset-token.service';

@Module({
    providers: [JwtTokenService, ResetTokenService],
    exports: [JwtTokenService, ResetTokenService],
})
export class TokenModule {}
