import {Controller, Get, Post, Req, UseGuards} from '@nestjs/common';

import {AppService} from './app.service';
import {LocalAuthGuard} from "./auth/local-auth.guard";
import {AuthService} from "./auth/auth.service";

@Controller()
export class AppController {
  constructor( private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('/auth/login')
  getData(@Req() reg) {
    return this.authService.login(reg.user);
  }
}
