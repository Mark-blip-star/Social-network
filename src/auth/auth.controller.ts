import {
  ConflictException,
  Controller,
  Post,
  Req,
  UseGuards,
  Session,
  Query,
  Get,
} from "@nestjs/common";
import { loginWithGuard } from "../common/guards/loginGuard";
import { LocalAuthGuard } from "../common/guards/auth.guard";
import { AuthService } from "./auth.service";
import { TokenService } from "../token/token.service";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post(`login`)
  @UseGuards(loginWithGuard)
  async login(@Req() req): Promise<void> {
    return req.user;
  }

  @Post("logout")
  @UseGuards(LocalAuthGuard)
  async logout(
    @Req() request: any,
    @Session() session: Record<string, unknown>
  ): Promise<{ error: { message: string } } | { message: string }> {
    return this.authService.logout(session, request);
  }

  @Get(`confirm`)
  async confirm(@Req() request: any, @Query(`token`) token: string) {
    return await this.authService.confirmEmail(token);
  }
}
