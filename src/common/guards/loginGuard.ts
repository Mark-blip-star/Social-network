import {Injectable,ExecutionContext} from "@nestjs/common";
import {AuthGuard} from "@nestjs/passport";

@Injectable()
export class loginWithGuard extends AuthGuard(`local`){
    async canActive(context:ExecutionContext):Promise<boolean>{
        console.log(`1`)
        await super.canActivate(context)
        console.log(`12`)
        const request = context.switchToHttp().getRequest()
        console.log(`13`)
        await super.logIn(request)
        console.log(`14`)
        return true
    }
}