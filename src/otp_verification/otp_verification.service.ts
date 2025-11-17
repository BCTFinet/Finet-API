import * as fs from 'fs';
import path from 'path/win32';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { randomInt } from 'crypto';
import { User } from '../schema/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { EmailService } from '../email/email.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { OtpVerification, OtpVerificationDocument } from '../schema/otp_verification.schema';

@Injectable()
export class OtpVerificationService {
    constructor(
        @InjectModel(OtpVerification.name)
        private otpModel : Model<OtpVerificationDocument>,
        private emailService : EmailService,

        @InjectModel(User.name)
        private userModel : Model<User>,
    ) {}

    async generateOtp(email : string, purpose : 'EMAIL_VERIFICATION' | 'PASSWORD_RESET') : Promise<{record : OtpVerificationDocument, otp : string}> {
        const otp = randomInt(100000, 999999).toString();
        const otpHashed = await bcrypt.hash(otp, 10);

        const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // OTP expires in 5 minutes

        try {
            // const record = await this.otpModel.findOneAndUpdate(
            // { email, purpose },
            // { email, otpHashed, expiresAt, purpose },
            // { new: true, upsert: true }
            // );

            const record = await this.otpModel.create({email, otpHashed, expiresAt, purpose});

            return { record, otp };
        } catch (error) {
            throw new BadRequestException('Failed to generate OTP');
        }
    }

    async sendOtp(email: string, purpose : 'EMAIL_VERIFICATION' | 'PASSWORD_RESET' = 'EMAIL_VERIFICATION') {

        // Check if user exists for PASSWORD_RESET purpose
        const user = await this.userModel.findOne({email});
        if(!user) {
            throw new BadRequestException('User not found');
        } 

       const {otp} = await this.generateOtp(email, purpose);
       const subject = purpose === 'EMAIL_VERIFICATION' ? 'Email Verification OTP' : 'Password Reset OTP';

       // Making the HTML Email Template
       const htmlTemplate = fs.readFileSync(path.join('templates', 'otp-email-template.html'), 'utf8');
       const html = htmlTemplate.replace('{{OTP_CODE}}', otp);
       
       await this.emailService.sendEmail(email, subject, html);

       return { message: 'OTP sent' };
    }

    async verifyOtpEmail(email : string, otp : string) {
        const userOtpRecord = await this.otpModel.findOne({ email, purpose: 'EMAIL_VERIFICATION' });

        // Check if OTP record exists
        if (!userOtpRecord) {
            throw new BadRequestException('OTP not Found');
        }

        // Check if OTP is expired
        if (userOtpRecord.expiresAt < new Date()) {
            throw new BadRequestException('OTP expired');
        }

        // Verify OTP
        const isOtpValid = await bcrypt.compare(otp, userOtpRecord.otpHashed);
        if (!isOtpValid) { 
            throw new BadRequestException('Invalid OTP');
        }

        // Update user's email verification status
        await this.userModel.findOneAndUpdate(
            {email},
            {is_email_verified: true},
            {new: true}
        );
        userOtpRecord.deleteOne().exec();

        return { message: 'Email verified successfully' };
    }
}
