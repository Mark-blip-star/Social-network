import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import Redis from "ioredis";
import connectRedis from "connect-redis";
import session from "express-session";
import { ConfigService } from "@nestjs/config";
import passport from "passport";
import cookieParser from "cookie-parser";
import { DatabaseConnectionService } from "./config/database-connection/database-connection.service";
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);

  const configService: ConfigService = app.get(ConfigService);

  const databaseConnectionService = app.get(DatabaseConnectionService);

  app.use(cookieParser(configService.get<string>("REDIS_SECRET")));

  const redisClient = new Redis(databaseConnectionService.getRedisConfig());

  const redisStore = connectRedis(session);

  const sessionStore = new redisStore({ client: redisClient });

  app.use(
    session({
      name: configService.get<string>("COOKIE_NAME"),
      secret: configService.get<string>("REDIS_SECRET"),
      store: sessionStore,
      cookie: {
        httpOnly: true,
        maxAge:
          configService.get<number>("COOKIE_EXPIRE_DAY") * 24 * 60 * 60 * 1000,
      },
      saveUninitialized: false,
      resave: false,
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());
}
bootstrap();
