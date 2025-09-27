import { Body, Controller, Post } from '@nestjs/common';
import { OtpVerificationService } from './otp_verification.service';

@Controller('otp-verification')
export class OtpVerificationController {
  constructor(private readonly otpVerificationService: OtpVerificationService) {}

  @Post('/send')
  async sendOtp(@Body('email') email : string, purpose: 'EMAIL_VERIFICATION' | 'PASSWORD_RESET' = 'EMAIL_VERIFICATION') {
    return this.otpVerificationService.sendOtp(email, purpose);
  }

  @Post('/verify-otp-email')
  async verifyOtpEmail(@Body() body : {email : string, otp : string}) {
    return this.otpVerificationService.verifyOtpEmail(body.email, body.otp);
  }
}
