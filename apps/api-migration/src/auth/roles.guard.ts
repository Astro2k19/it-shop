import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRoles } from './roles.enum';
import { ROLES_KEY } from './roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) {}
    canActivate(context: ExecutionContext) {
        const requiredRoles: UserRoles[] | undefined =
            this.reflector.getAllAndOverride(ROLES_KEY, [
                context.getClass(),
                context.getHandler(),
            ]);
        if (!requiredRoles) {
            return true;
        }
        const { user } = context.switchToHttp().getRequest();
        return requiredRoles.some((requiredRole) =>
            user.roles?.includes(requiredRole)
        );
    }
}
