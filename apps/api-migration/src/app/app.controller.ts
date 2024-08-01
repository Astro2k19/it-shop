import { Controller, Get } from '@nestjs/common';
import {ConfigService} from "@nestjs/config";
@Controller()
export class AppController {
  constructor(private readonly configService: ConfigService) {}

  @Get('test')
  getSmt() {
    console.log(this.configService.get('DATABASE_URL'));
    return this.configService.get('DATABASE_URL')
  }
}
