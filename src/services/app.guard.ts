import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    const authorization = req.headers.authorization?.split(' ');

    // validate barrier structure
    if (!authorization || authorization.length < 2) {
      throw new UnauthorizedException('Authorization token/user are not valid');
    }

    // extract Information
    const buff = Buffer.from(authorization[1], 'base64');
    const userAndPassword = buff.toString('ascii');

    // validate structure and credentials
    const userAndPasswordSplitted = userAndPassword?.split(':');

    // validate barrier structure
    if (!userAndPasswordSplitted || userAndPasswordSplitted.length !== 2) {
      throw new UnauthorizedException('Authorization token/user are not valid');
    }

    // Set userName to the request
    const userName = userAndPasswordSplitted[0];
    req.userName = userName;

    return true;
  }
}
