import { Module } from '@nestjs/common';
import {TokenService} from "./token.service";
import {TokenController} from "./token.controller";
import {ConfigModule} from "@nestjs/config";

@Module({
    providers:[TokenService,ConfigModule],
    controllers:[TokenController],
    exports:[TokenService]
})
export class TokenModule {}
