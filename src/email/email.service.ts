import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';


@Injectable()
export class EmailService {
    constructor(private readonly configService: ConfigService) {}
    emailTransport() {
        const transporter = nodemailer.createTransport({
            host: this.configService.get<string>('EMAIL_HOST'), 
            port: this.configService.get<number>('EMAIL_PORT'),
            secure : false,
            auth : {
                user : this.configService.get<string>('EMAIL_USER'),
                pass : this.configService.get<string>('EMAIL_PASSSWORD'),
            }
        });

        return transporter;
    }

    async sendEmail(recepient: string, subject : string, htmlContent: string) {
        const transporter = this.emailTransport();

        const mailOptions = {
            from: this.configService.get<string>('EMAIL_USER'),
            to: recepient,
            subject: subject,
            html: htmlContent,
        };  

        try {
            await transporter.sendMail(mailOptions);
        }   
        catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }
}
