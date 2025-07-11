/* import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../../shared/decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>(ROLES_KEY, context.getHandler());

    if (!roles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();

    const user = request.user;
    if (!user || !user.role) {
      return false;
    }

    return this.matchRoles(roles, user.role);
  }

  private matchRoles(requiredRoles: string[], userRoles: any): boolean {
    return requiredRoles.includes(userRoles.value);
  }
}
*/ 