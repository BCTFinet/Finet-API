import { Inject, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { AuthGuard, PassportStrategy } from "@nestjs/passport";
import { Strategy, VerifyCallback } from 'passport-google-oauth2';


@Injectable()  
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
    constructor(
        @Inject() private readonly configService : ConfigService,
    ) {
        super({
            clientID: configService.getOrThrow<string>('GOOGLE_CLIENT_ID'),
            clientSecret: configService.getOrThrow<string>('GOOGLE_CLIENT_SECRET'),
            callbackURL: configService.getOrThrow<string>('GOOGLE_CALLBACK_URL'),
            scope: ['email', 'profile'],
        });
    }

    async validate(
        _accessToken : string, 
        _refreshToken : string, 
        profile : any,
        done : VerifyCallback
    ): Promise<any> {
        const { id, name, emails, photos } = profile;
        
        const user = {
            provider: 'google',
            providerId: id,
            email: emails[0].value,
            name: `${name.givenName} ${name.familyName}`,
            picture: photos[0].value,
        };

        done(null, user);
    }
}

