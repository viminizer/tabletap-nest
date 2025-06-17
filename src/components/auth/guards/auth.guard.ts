import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from '../auth.service';
import { EErrorMessage } from '../../../libs/enums';

@Injectable()
export class AuthGuard implements CanActivate {
  private readonly logger = new Logger(AuthGuard.name);
  constructor(private authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    this.logger.log('--- @guard() Authentication [AuthGuard] ---');
    const request: Request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException(EErrorMessage.NOT_AUTHENTICATED);
    }
    try {
      const payload = this.authService.verifyToken(token);
      request['user'] = payload;
    } catch (err) {
      this.logger.warn(`Invalid token: ${err?.message}`);
      throw new UnauthorizedException(EErrorMessage.NOT_AUTHENTICATED);
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
