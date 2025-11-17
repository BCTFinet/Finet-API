import { Module } from '@nestjs/common';
import { OtpVerificationService } from './otp_verification.service';
import { OtpVerificationController } from './otp_verification.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { OtpVerification, OtpVerificationSchema } from '../schema/otp_verification.schema';
import { EmailService } from '../email/email.service';
import { User, UserSchema } from '../schema/user.schema';
import { UserModule } from '../user/user.module';

@Module({
  imports : [
    MongooseModule.forFeature([
      {name : OtpVerification.name, schema: OtpVerificationSchema},
      {name : User.name, schema: UserSchema }
    ]),
    UserModule,
  ],
  controllers: [OtpVerificationController],
  providers: [OtpVerificationService, EmailService],
})
export class OtpVerificationModule {}
