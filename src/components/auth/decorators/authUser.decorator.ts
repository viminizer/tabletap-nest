import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const AuthUser = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    let request: any;
    request = ctx.switchToHttp().getRequest();
    const user = request['user'];
    if (user) return data ? user?.[data] : user;
    else return null;
  },
);
