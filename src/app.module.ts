import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UserModule } from "./user/user.module";
import { RolesModule } from "./roles/roles.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DatabaseConnectionService } from "./config/database-connection/database-connection.service";
import { DatabaseConnectionModule } from "./config/database-connection/database-connection.module";
import { ProfileController } from "./profile/profile.controller";
import { ConfigModule } from "@nestjs/config";
import { ProfileModule } from "./profile/profile.module";
import { TokenService } from "./token/token.service";
import { TokenController } from "./token/token.controller";
import { TokenModule } from "./token/token.module";
import { MailService } from "./mail/mail.service";
import { MailController } from "./mail/mail.controller";
import { MailModule } from "./mail/mail.module";
import { join } from "path";
import { AuthController } from "./auth/auth.controller";
import { AuthService } from "./auth/auth.service";
import { AuthModule } from "./auth/auth.module";
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: join(__dirname, `../.env.development`),
      ignoreEnvFile: false,
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [DatabaseConnectionModule],
      inject: [DatabaseConnectionService],
      useFactory: async (
        databaseConnectionService: DatabaseConnectionService
      ) => databaseConnectionService.getPostgresConfig(),
    }),
    UserModule,
    RolesModule,
    ProfileModule,
    TokenModule,
    MailModule,
    AuthModule,
  ],

  controllers: [
    AppController,
    ProfileController,
    TokenController,
    MailController,
    AuthController,
  ],
  providers: [AppService, TokenService, MailService, AuthService],
})
export class AppModule {}
