import { HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../schema/user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

// Service is where it handles the logic side 
type AuthInput = {email : string, password : string}; 

@Injectable()
export class AuthService {
    constructor (
        @InjectModel(User.name) 
        private userModel: Model<UserDocument>,
        private jwtService : JwtService,
    ){}

    async register(email: string, password: string) : Promise<UserDocument> {
        const hashedPassword = await bcrypt.hash(password, 10);
        return await this.userModel.create({ email, password: hashedPassword });
    }

    async login(user : any){
        const payload = {email : user.email, sub: user._id}

        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }

    async validateUser(input : AuthInput): Promise<UserDocument | null>{
        // Search for the Data User
        const user = await this.userModel.findOne({email : input.email})

        // Validate the Data User
        if (!user || await bcrypt.compare(input.password, user.password)) {
            return null;
        }

        return user;
    }

    async logout(token : string) : Promise<any>{
        return {message : 'Succesffuly Logged Out'}
    }
}
