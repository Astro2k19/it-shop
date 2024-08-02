import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTokenDto {
    @IsNotEmpty()
    @IsString()
    refreshToken: string;
}
