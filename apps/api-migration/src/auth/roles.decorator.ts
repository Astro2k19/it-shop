import { SetMetadata } from '@nestjs/common';
import { UserRoles } from './roles.enum';

export const ROLES_KEY = 'ROLES_KEY';
export const Roles = (...roles: UserRoles[]) => SetMetadata(ROLES_KEY, roles);
