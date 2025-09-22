import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor() {
        // Extract the JWT Token from Request and add the Secret Key
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_SECRET ?? 'default', 
            ignoreExpiration: false,
        })
    }

    async validate(payload : any) {
        return {userId : payload.sub, email : payload.email}
    }
}