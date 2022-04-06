import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class loginWithGuard extends AuthGuard(`local`) {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      await super.canActivate(context);

      const request = context.switchToHttp().getRequest();

      await super.logIn(request);

      return true;
    } catch (e) {
      throw new UnauthorizedException({ message: e.message });
    }
  }
}
