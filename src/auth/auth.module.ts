import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { UserModule } from "../user/user.module";
import { LocalSerializer } from "./local.serializer";
import { LocalStrategy } from "./local.strategy";
import { AuthController } from "./auth.controller";
import { TokenModule } from "../token/token.module";

@Module({
  controllers: [AuthController],
  imports: [UserModule, TokenModule],
  providers: [AuthService, LocalSerializer, LocalStrategy],
})
export class AuthModule {}
