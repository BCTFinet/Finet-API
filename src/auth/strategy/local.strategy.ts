import { Injectable} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy){
    constructor(private authService: AuthService){
        // If the field is not filled, it gives out an unauthorized error
        super({
            // Do this to expect an email instead of a username
            usernameField : 'email', 
            passwordField: 'password'
        });
    }

    async validate(email : string, password : string): Promise<any> {
        const user = await this.authService.validateUser({ email, password });
        // Return the user object to be stored in the request
        return user;
    }
}