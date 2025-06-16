import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from '../auth.service';
import { EErrorMessage } from 'src/libs/enums';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    console.info('--- @guard() Authentication [AuthGuard] ---');
    const request: Request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException(EErrorMessage.NOT_AUTHENTICATED);
    }
    try {
      const payload = this.authService.verifyToken(token);
      request['user'] = payload;
    } catch {
      throw new UnauthorizedException(EErrorMessage.NOT_AUTHENTICATED);
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
