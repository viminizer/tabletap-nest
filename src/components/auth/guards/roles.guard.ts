import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { EErrorMessage } from '../../../libs/enums';

@Injectable()
export class RolesGuard implements CanActivate {
  private readonly logger = new Logger(RolesGuard.name);
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.get<string[]>(
      'roles',
      context.getHandler(),
    );
    if (!requiredRoles) return true;
    this.logger.debug(
      `--- @guard() Authentication [RolesGuard]: ${requiredRoles} ---`,
    );
    const { user } = context.switchToHttp().getRequest();
    if (!user) {
      throw new UnauthorizedException(
        EErrorMessage.ONLY_SPECIFIC_ROLES_ALLOWED,
      );
    }
    const hasRole = requiredRoles.some((role) => user.userType === role);
    if (!hasRole) {
      throw new ForbiddenException(EErrorMessage.ONLY_SPECIFIC_ROLES_ALLOWED);
    }
    return true;
  }
}
