import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from 'src/schema/user.schema';
import { Model, Types } from 'mongoose';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userModel : Model<UserDocument>
  ){}

  // Get all Users
  async findAll() : Promise<UserDocument[] | null> {
    try {
      return await this.userModel.find();
    }
    catch (error) {
      throw new InternalServerErrorException('Something went wrong!')
    }
  }
  
  // Get one details of the user
  async findOne(_id: Types.ObjectId) : Promise<UserDocument>{
    try{
      const user =  await this.userModel.findOne({_id});

      if (!user) {
        throw new NotFoundException('User Not Found');
      }

      return user;
    }
    catch (error){
      throw new InternalServerErrorException('Someting went wrong!')
    }
  }

  // Create new Users
  async create(createUserDto: CreateUserDto) : Promise<UserDocument> {
    try {
      return this.userModel.create({
        email : createUserDto.email,
        password : createUserDto.password
      })
    } catch (error) {
      throw new InternalServerErrorException('Someting went wrong!')
    }
  }

  // Update User Profile
  async update(_id: Types.ObjectId, updateUserDto: UpdateUserDto) : Promise<UserDocument> {
    try {
      const user = await this.userModel.findOneAndUpdate(
        {_id},
        {
          email : updateUserDto.email,
          password : updateUserDto.password
        },
        {new : true}
      )

      if (!user){
        throw new NotFoundException('User Not Found')
      }
      
      return user;

    } catch (error) {
      throw new InternalServerErrorException('Something Went Wrong');
    }
  }

  // Delete User Profile
  async remove(_id: Types.ObjectId) : Promise<UserDocument> {
    try {
        const user = await this.userModel.findOneAndDelete({_id});

        if (!user) {
          throw new NotFoundException('User Not Found');
        }

        return user;
    } catch (error) {
      throw new InternalServerErrorException('Something Went Wrong');
    }
  }
}
