import {Module} from '@nestjs/common';
import {AuthService} from './auth.service';
import {UsersModule} from "../users/users.module";
import {LocalStrategy} from "./local.strategy";
import {PassportModule} from "@nestjs/passport";
import {LocalAuthGuard} from "./local-auth.guard";
import {JwtModule} from "@nestjs/jwt";
import {jwtConstanse} from "./constanse";

@Module({
  imports: [UsersModule, PassportModule, JwtModule.register({
    secret: jwtConstanse.secret,
    signOptions: {
      expiresIn: '60s'
    },
  })],
  exports: [AuthService],
  providers: [AuthService, LocalStrategy, LocalAuthGuard],
})
export class AuthModule {}
