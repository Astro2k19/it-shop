import { PickType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserProfileDto extends PickType(CreateUserDto, [
    'name',
    'email',
] as const) {}
