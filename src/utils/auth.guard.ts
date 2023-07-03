// auth.guard.ts
import {
  CanActivate,
  ExecutionContext,
  HttpCode, HttpStatus,
  Injectable
} from "@nestjs/common";
import tokenVerify from './verify';

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const http = context.switchToHttp();
    const req = http.getRequest();
    const res = http.getResponse();
    const token = req.headers.authorization;
    const data = tokenVerify(token);
    if (data) {
      // Add the decoded token to the request object
      req.user = data;
      return true;
    } else {
      res.send({
        success: false,
        data: {
          statusCode: HttpStatus.UNAUTHORIZED,
          message: 'unauthorized',
        },
      });
      return false;
    }
  }
}
