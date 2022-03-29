import { PassportSerializer } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";

import { User } from "../user/entities/user.entity";

@Injectable()
export class LocalSerializer extends PassportSerializer {
  constructor() {
    super();
  }

  serializeUser(user: User, done: CallableFunction): void {
    done(null, user.id);
  }

  deserializeUser(userId: number, done: CallableFunction): void {
    done(null, userId);
  }
}
