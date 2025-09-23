import { Body, Controller, Post, Req, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard, LocalAuthGuard } from './auth.guard';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

// Controller is handling input request and outputs request back (routes)

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    // Routes : /auth/register
    @Post('register')
    async register(@Body(new ValidationPipe()) createUserDto: CreateUserDto) {
        // Register User
        const user = await this.authService.register(createUserDto);
        return {message : "Succesfully Created an Account!", user}
    }
    
    // Routes : /auth/login
    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Req() req){
        // Generate JWT Token
        const token = await this.authService.login(req.user);
        return {message : "Succesfully Logged In!", token}
    }
    
    // Routes : /auth/logout
    @UseGuards(JwtAuthGuard)
    @Post('logout')
    async logout (@Req() req) {
        // Get the Token and then split it from the bearer token
        const token = req.headers.authorization?.split(' ')[1];
        return this.authService.logout(token);
    }
}
