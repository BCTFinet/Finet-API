import { Body, Controller, Post } from '@nestjs/common';
import { OtpVerificationService } from './otp_verification.service';

import { ApiBadRequestResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('OTP Token')
@Controller('otp-verification')
export class OtpVerificationController {
  constructor(private readonly otpVerificationService: OtpVerificationService) {}

  @ApiOperation({ summary: 'Send OTP' })
  @ApiOkResponse({ description: 'OTP Sent Successfully.'})
  @ApiBadRequestResponse({ description: 'Failed to send OTP. User not found.'})
  @Post('/send')
  async sendOtp(@Body('email') email : string, purpose: 'EMAIL_VERIFICATION' | 'PASSWORD_RESET' = 'EMAIL_VERIFICATION') {
    return this.otpVerificationService.sendOtp(email, purpose);
  }
  
  @ApiOperation({ summary: 'Verify OTP Email' })
  @ApiOkResponse({ description: 'Email verified successfully.'})
  @ApiBadRequestResponse({ description: 'Failed to verify OTP. Invalid or expired OTP.'})
  @Post('/verify-otp-email')
  async verifyOtpEmail(@Body() body : {email : string, otp : string}) {
    return this.otpVerificationService.verifyOtpEmail(body.email, body.otp);
  }
}
