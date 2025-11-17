import { BadRequestException, ConflictException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../schema/user.schema';
import { Model, Types } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../user/dto/create-user.dto';

// Service is where it handles the logic side 
// Throw every error at the service file 
@Injectable()
export class AuthService {
    constructor (
        @InjectModel(User.name) 
        private userModel: Model<UserDocument>,
        private jwtService : JwtService,
    ){}

    async generateJwt(payload : {email : string, sub : Types.ObjectId}) : Promise<string> {
        try{
            return this.jwtService.signAsync(payload);
        }
        catch(error) {
            throw new InternalServerErrorException(error.message);
        }
    }

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

            throw new InternalServerErrorException(error.message);
        }
    }

    async login(user : any){
        try{
            const payload = {email : user.email, sub: user._id}
            return await this.generateJwt(payload);
        }
        catch (error){
            throw new InternalServerErrorException(error.message);
        }
    }

    async validateUser(data : {email : string, password: string}): Promise<UserDocument>{
        // Validate Password Type
        if (typeof data.password !== 'string' || !data.password.trim()) {
            throw new BadRequestException('Invalid Password!')
        }

        // Validate Email Type
        if (typeof data.email !== 'string' || !data.email.trim()) {
            throw new BadRequestException('Invalid Email!')
        }

        try{
            // Search for the Data User
            const user = await this.userModel.findOne({email : data.email})

            // Validate the Data User
            if (!user || !await bcrypt.compare(data.password, user.password)) {
                throw new UnauthorizedException('Invalid Credentials');
            }

            // const {password, ...result} = user;
            return user;
        }
        catch (error){
            throw new InternalServerErrorException(error.message);
        }
    }


    async getProfile(userId : string) : Promise<UserDocument>{
        try{
            const user = await this.userModel.findById(userId).select('-password');
            
            if (!user) {
                throw new NotFoundException('User not found');
            }
    
            return user;
        }

        catch (error){
            throw new InternalServerErrorException(error.message);
        }
    }

    async logout(token : string) : Promise<any>{
        return {message : 'Successfully Logged Out'}
    }

    async googleLogin(user : any) : Promise<string> {
        if (!user) {
            throw new UnauthorizedException('No user from Google');
        }

        const userExists = await this.userModel.findOne({email : user.email});

        if(!userExists) {
            // If the user doesnt exist, create a new user
            try{
                const newUser = await this.userModel.create({
                    email : user.email,
                    username : user.name,
                });

                // Generate JWT Token
                return await this.generateJwt({email : newUser.email, sub : newUser._id});
            }
            catch (error) {
                throw new InternalServerErrorException(error.message);
            }
        }

        // If the user exists, generate JWT Token
        return await this.generateJwt({email : userExists.email, sub : userExists._id});
    }
}
