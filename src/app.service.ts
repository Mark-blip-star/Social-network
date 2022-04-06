import { Injectable, Req } from "@nestjs/common";

@Injectable()
export class AppService {
  getHello(req): any {
    console.log(req);
  }
}
