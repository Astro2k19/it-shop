import { IsNotEmpty, IsString } from 'class-validator';

export class ConnectReviewDto {
    @IsNotEmpty()
    @IsString()
    id: string;
}
