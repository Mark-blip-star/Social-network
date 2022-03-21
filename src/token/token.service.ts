import { Injectable } from '@nestjs/common';
import {sign,verify,JwtPayload} from "jsonwebtoken"
import {ConfigService} from "@nestjs/config";


@Injectable()
export class TokenService {
    private readonly jwtSecret: string;
    private readonly jwtExpireTime: string;

    public constructor(private readonly configService:ConfigService) {
        this.jwtSecret = this.configService.get<string>('JWT_SECRET_KEY');
        this.jwtExpireTime = this.configService.get<string>('JWT_TOKEN_EXPIRE_TIME');
    }

    public async getToken(payload:string){
        return sign({payload},this.jwtSecret,{expiresIn:this.jwtExpireTime})
    }

    public async decodeToken(token:string):JwtPayload{
        try {
            return verify(token, this.jwtSecret) as JwtPayload;
        } catch (error) {
            return error;
        }
    }
}
