import { Body, Controller, Post } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserCreateDto } from "./dto/UserCreateDto";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post("register")
  public async createUser(@Body() user: UserCreateDto) {
    return this.userService.createUser(user);
  }
}
