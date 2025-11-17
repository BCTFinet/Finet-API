import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
// import { CreateUserDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../schema/user.schema';
import { Model, Types } from 'mongoose';
import { UpdateUserDto } from './dto/update-user.dto';
import { CloudinaryService } from '../cloudinary/cloudinary.service';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userModel : Model<UserDocument>,
    private cloudinaryService : CloudinaryService
  ){}

  // Get all Users
  async findAll() : Promise<UserDocument[] | null> {
    try {
      return await this.userModel.find();
    }
    catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  // Create new Users
  // async create(createUserDto: CreateUserDto) : Promise<UserDocument> {
  //   try {
  //     return this.userModel.create({
  //       email : createUserDto.email,
  //       password : createUserDto.password
  //     })
  //   } catch (error) {
  //     throw new InternalServerErrorException('Someting went wrong!')
  //   }
  // }

  // Update User Profile
  async update(_id: Types.ObjectId, updateUserDto: UpdateUserDto, file : Express.Multer.File) : Promise<UserDocument> {
    try {
      const user = await this.userModel.findOneAndUpdate(
        {_id},
        {
          email : updateUserDto.email,
          username : updateUserDto.username,
          phone_number : updateUserDto.phone_number,
          dob : updateUserDto.dob
        },
        {new : true}
      )

      if (!user){
        throw new NotFoundException('User Not Found')
      }

      if (file) {
        // Delete old profile image if exists
        const oldImageUrl = user.profile_image;
        if (oldImageUrl) {
          const publicId = oldImageUrl.split('/');
          const folder = publicId[publicId.length - 2];
          const imageName = publicId[publicId.length - 1].split('.')[0];

          // With Folder Name
          const fullPublicId = `${folder}/${imageName}`;

          if (fullPublicId) {
            await this.cloudinaryService.deleteImage(fullPublicId);
          }
          
        }

        // Upload new profile image
        const uploadResult = await this.cloudinaryService.uploadImage(file);
        user.profile_image = uploadResult.secure_url;
        await user.save();
      }
      
      return user;

    } catch (error) {
      throw new InternalServerErrorException(error.message);
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
      throw new InternalServerErrorException(error.message);
    }
  }
}
