import { IsOptional, IsString } from 'class-validator';

export class UpdateTokenDto {
    @IsOptional()
    @IsString()
    refreshToken?: string;
}
