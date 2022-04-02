import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { User } from "../../user/entities/user.entity";
import { Roles } from "../../roles/entities/roles.entity";
import IORedis from "ioredis";
import { Posts } from "../../posts/entity/post.entity";
import { Files } from "../../files/entity/file.entity";
import { Likes } from "../../likes/entity/likes.entity";

@Injectable()
export class DatabaseConnectionService {
  private readonly postgresConfig: TypeOrmModuleOptions;
  private readonly redisConfig: IORedis.RedisOptions;

  public constructor(private readonly configService: ConfigService) {
    this.postgresConfig = {
      type: "postgres",
      host: this.configService.get<string>(`POSTGRES_HOST`),
      port: this.configService.get<number>(`POSTGRES_PORT`),
      username: this.configService.get<string>(`POSTGRES_USER`),
      password: this.configService.get<string>(`POSTGRES_PASSWORD`),
      database: this.configService.get<string>(`POSTGRES_DB`),
      synchronize: true,
      retryAttempts: 3,

      entities: [User, Roles, Posts, Files, Likes],
      migrationsRun: true,
      migrations: ["./migrations/*.ts"],

      cli: {
        migrationsDir: "./migrations",
      },
    };

    this.redisConfig = {
      port: this.configService.get<number>("REDIS_PORT"),
      host: this.configService.get<string>("REDIS_HOST"),
    };
  }

  public getPostgresConfig() {
    return this.postgresConfig;
  }

  public getRedisConfig() {
    return this.redisConfig;
  }
}
