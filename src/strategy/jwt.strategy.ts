import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Types } from "mongoose";
import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(private readonly configService: ConfigService) {
        // Extract the JWT Token from Request and add the Secret Key
        const jwtSecret = configService.get<string>('JWT_SECRET');
        
        if (!jwtSecret) {
            throw new Error('JWT_SECRET environment variable is not set');
        }

        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: jwtSecret,
            ignoreExpiration: false,
        })
    }

    async validate(payload : any) {
        return {userId : new Types.ObjectId(payload.sub), email : payload.email}
    }
}