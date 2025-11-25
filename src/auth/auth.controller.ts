import { Body, Controller, Get, Post, Req, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { GoogleOAuthGuard } from './guards/google-auth.guard';
import { JwtAuthGuard, LocalAuthGuard } from './guards/auth.guard';

import { ApiBearerAuth, ApiTags, ApiOperation, ApiOkResponse, ApiConflictResponse, ApiBadRequestResponse, ApiUnauthorizedResponse, ApiNotFoundResponse } from '@nestjs/swagger';

// Controller is handling input request and outputs request back (routes)
@ApiBearerAuth()
@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @ApiOperation({ summary: 'Register a new user' })
    @ApiOkResponse({ description: 'Successfully registered a new user.'})
    @ApiConflictResponse({ description: 'Email already exist' })
    @ApiBadRequestResponse({ description: 'Invalid request parameters' })
    @Post('register')
    async register(@Body(new ValidationPipe({ transform: true })) createUserDto: CreateUserDto) {
        // Register User
        const user = await this.authService.register(createUserDto);
        return {message : "Succesfully Created an Account!", user}
    }
    
    @ApiOperation({ summary: 'Login a user' })
    @ApiOkResponse({ description: 'Successfully logged in a user.'})
    @ApiBadRequestResponse({ description: 'Invalid request parameters' })
    @ApiUnauthorizedResponse({ description: 'Invalid credentials' })
    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Req() req){
        const token = await this.authService.login(req.user);
        return {message : "Succesfully Logged In!", token}
    }

    @ApiOperation({ summary: 'Get user profile' })
    @ApiOkResponse({ description: 'Successfully fetched user profile.'})
    @ApiNotFoundResponse({ description: 'User not found' })
    @UseGuards(JwtAuthGuard)
    @Get('profile')
    async getProfile(@Req() req) {
        // Get User Profile
        const profile = await this.authService.getProfile(req.user.userId);
        return {message : "Succesfully Fetched User Profile!", profile}
    }
    
    @ApiOperation({ summary: 'Logout a user' })
    @ApiOkResponse({ description: 'Successfully logged out a user.'})
    @UseGuards(JwtAuthGuard)
    @Post('logout')
    async logout (@Req() req) {
        // Get the Token and then split it from the bearer token
        const token = req.headers.authorization?.split(' ')[1];
        return this.authService.logout(token);
    }
    
    @ApiOperation({ summary: 'Google Account Authentication Link' })
    @Get('google')
    @UseGuards(GoogleOAuthGuard)
    async googleAuth() {}
    
    @ApiOperation({ summary: 'Google Account Authentication Callback' })
    @ApiOkResponse({ description: 'Successfully logged in via google account.'})
    @ApiUnauthorizedResponse({ description: 'No user from Google' })
    @Get('google/callback')
    @UseGuards(GoogleOAuthGuard)
    async googleAuthRedirect(@Req() req) : Promise<{message : string, token : string}> {
        const token = await this.authService.googleLogin(req.user);
        
        return {
            message : "Succesfully Logged In with Google!", 
            token
        };
    }
}
