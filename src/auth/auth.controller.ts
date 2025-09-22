import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard, LocalAuthGuard } from './auth.guard';

// Controller is handling input request and outputs request back (routes)

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('register')
    async register(@Body() body: {email : string, password: string}) {
        return await this.authService.register(body.email, body.password);
    }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Req() req){
        return await this.authService.login(req.user);
    }

    @UseGuards(JwtAuthGuard)
    @Post('logout')
    async logout (@Req() req) {
        // Get the Token and then split it from the bearer token
        const token = req.headers.authorization?.split(' ')[1];
        return this.authService.logout(token);
    }
}
