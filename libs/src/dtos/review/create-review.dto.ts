import { IsNotEmpty, IsString } from 'class-validator';

export class CreateReviewDto {
    @IsNotEmpty()
    @IsString()
    comment: string;
}
