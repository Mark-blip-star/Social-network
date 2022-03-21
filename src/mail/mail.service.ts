import { Injectable } from '@nestjs/common';
import {ConfigService} from "@nestjs/config";
import {MailMessage} from "./types/mail.type";
import nodemailer = require('nodemailer');


@Injectable()
export class MailService {
    private readonly client
    private readonly appemail
    constructor(private readonly configService:ConfigService) {
        this.client = nodemailer.createTransport({
            host:this.configService.get<string>(`SMTP_HOST`),
            port:this.configService.get<number>('SENDGRID_PORT'),
            secure:false,
            auth:{
                user:"marko.solomchak.inst@gmail.com",
                pass:"Samponelove228"
            }
        })

        this.appemail = this.configService.get<string>(`APP_EMAIL`)
    }

    public async sendMailMessage(message:MailMessage){
        const {to,text,subject,html}= message

        await this.client.sendMail({to,subject,text,html,from:this.appemail})
    }
}
