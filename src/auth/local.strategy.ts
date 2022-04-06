import { Strategy } from "passport-local";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthService } from "./auth.service";

interface userRes {
  message: string;
  user: {
    id: number;
    userName: string;
  };
}

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: "login",
      passwordField: "password",
    });
  }

  async validate(
    username: string,
    password: string
  ): Promise<{ id: number; userName: string }> {
    const { user, message } = (await this.authService.login(
      username,
      password
    )) as userRes;

    if (!user) throw new UnauthorizedException(message);

    return user;
  }
}
