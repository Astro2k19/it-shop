import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MailModule } from '@/mail/mail.module';
import { TokenModule } from '@/token/token.module';

@Module({
    imports: [MailModule, TokenModule],
    providers: [UsersService],
    exports: [UsersService],
    controllers: [UsersController],
})
export class UsersModule {}
