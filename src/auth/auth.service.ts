import { BadRequestException, ConflictException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../schema/user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

// Service is where it handles the logic side 
// Throw every error at the service file 
@Injectable()
export class AuthService {
    constructor (
        @InjectModel(User.name) 
        private userModel: Model<UserDocument>,
        private jwtService : JwtService,
    ){}

    async register(data : CreateUserDto) : Promise<UserDocument> {
        try {
            const hashedPassword = await bcrypt.hash(data.password, 10);
            return await this.userModel.create({ email : data.email, password: hashedPassword });
        } 
        catch (error) {
            if (error.code === 11000) {
                // Mongo duplicate key error
                throw new ConflictException('Email already exists');
            }

            throw new InternalServerErrorException('Something went wrong');
        }
    }

    async login(user : any){
        const payload = {email : user.email, sub: user._id}
        return await this.jwtService.signAsync(payload)
    }

    async validateUser(data : CreateUserDto): Promise<UserDocument>{
        // Validate Password Type
        if (typeof data.password !== 'string' || !data.password.trim()) {
            throw new BadRequestException('Invalid Password!')
        }

        // Validate Email Type
        if (typeof data.email !== 'string' || !data.email.trim()) {
            throw new BadRequestException('Invalid Email!')
        }

        // Search for the Data User
        const user = await this.userModel.findOne({email : data.email})

        // Validate the Data User
        if (!user || !await bcrypt.compare(data.password, user.password)) {
            throw new UnauthorizedException('Invalid Credentials');
        }

        // const {password, ...result} = user;
        return user;
    }

    async logout(token : string) : Promise<any>{
        return {message : 'Succesffuly Logged Out'}
    }
}
