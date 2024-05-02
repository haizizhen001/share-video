import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export interface IUserAuth {
  userId: string;
  userName: string;
  email: string;
}

export function AuthUser() {
  console.log('AuthUser');
  return createParamDecorator((_data: unknown, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();

    const user = request.user;

    return user;
  })();
}
