import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { Match } from './match.decorator';

export class ResetPasswordDto {
    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    password: string;

    @Match('password')
    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    @IsEmail()
    comparedPassword: string;
}
