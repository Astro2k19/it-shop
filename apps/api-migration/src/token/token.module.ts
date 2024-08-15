import { Module } from '@nestjs/common';
import { JwtTokenService } from './jwt-token.service';
import { ResetTokenService } from './reset-token.service';
import {JwtModule} from "@nestjs/jwt";

@Module({
    imports: [JwtModule.register({ global: true })],
    providers: [JwtTokenService, ResetTokenService],
    exports: [JwtTokenService, ResetTokenService],
})
export class TokenModule {}
