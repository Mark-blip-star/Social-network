import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UserModule } from "./user/user.module";
import { RolesModule } from "./roles/roles.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DatabaseConnectionService } from "./config/database-connection/database-connection.service";
import { DatabaseConnectionModule } from "./config/database-connection/database-connection.module";
import { ConfigModule } from "@nestjs/config";
import { ProfileModule } from "./profile/profile.module";
import { TokenModule } from "./token/token.module";
import { MailModule } from "./mail/mail.module";
import { join } from "path";
import { AuthModule } from "./auth/auth.module";
import { PostsModule } from "./posts/posts.module";
import { UploadModule } from "./upload/upload.module";
import { FilesModule } from './files/files.module';
import { LikesModule } from './likes/likes.module';
import { CommentsModule } from './comments/comments.module';
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
    PostsModule,
    UploadModule,
    FilesModule,
    LikesModule,
    CommentsModule,
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
