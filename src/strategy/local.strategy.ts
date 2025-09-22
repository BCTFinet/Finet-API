import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy){
    constructor(private authService: AuthService){
        super({
            usernameField : 'email', 
            passwordField: 'password'
        });
    }

    async validate(email : string, password: string): Promise<any> {
        const user = await this.authService.validateUser({ email, password });
        
        // 2. If user not found or password invalid, throw error
        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }
        
        // 3. Return the user object to be stored in the request
        return user;
    }
}