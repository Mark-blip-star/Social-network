import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { UserService } from "../user/user.service";
import { notFoundMessage } from "../common/messages/error.messages";
import { UserStatus } from "../common/enums/user.enums";
import { compare } from "bcrypt";
import { TokenService } from "../token/token.service";

enum statusEnum {
  pending = "Email not confirmed. Please, verify your email address first",
  banned = "User has been banned",
  deleted = "User has been deleted",
}

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly tokenService: TokenService
  ) {}
  async login(
    username: string,
    password: string
  ): Promise<{ user: { id: number; userName: string } } | { message: string }> {
    const findUser = await this.userService.getUserByEmail(username);

    if (!findUser)
      throw new NotFoundException({ message: notFoundMessage(username) });

    if (findUser.status !== UserStatus.Active)
      return new BadRequestException({
        message: `${statusEnum[findUser.status]}`,
      });

    const checkPassword = this.checkPassword(findUser.password, password);

    if (!checkPassword)
      throw new BadRequestException({ message: "Incorrect password" });

    const userData = { id: findUser.id, userName: findUser.firstName };

    return { user: userData };
  }

  public logout(
    session: Record<string, unknown>,
    request: any
  ): { error: { message: string } } | { message: string } {
    request.logout();

    return { message: "Logout successfully" };
  }

  private async checkPassword(hash: string, password: string) {
    return await compare(password, hash);
  }

  public async confirmEmail(token: string): Promise<{ message: string }> {
    const checkToken = await this.tokenService.decodeToken(token);

    if (!checkToken)
      return new BadRequestException({ message: "Link has been expired" });

    const user = await this.userService.getUserByEmail(checkToken.payload);

    if (!user)
      return new NotFoundException({
        message: `User not found.Try create account again`,
      });

    if (user.status === UserStatus.Active) {
      return new BadRequestException({ message: "Email is alredy confirmed" });
    }

    await this.userService.upDateUserEmailConfirm(
      user.email,
      UserStatus.Active
    );

    return { message: "Email confirmed successfully" };
  }
}
