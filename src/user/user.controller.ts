import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, UseInterceptors, UploadedFile } from '@nestjs/common';
// import { Types } from 'mongoose';
// import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { UserDocument } from 'src/schema/user.schema';
import { UpdateUserDto } from './dto/update-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  
  @Get('/all_user')
  async findAll() : Promise<{message : string, users : UserDocument[] | null}>{
    /*
      Asynchornous handles Find All Users Service

      Args:
        None

      Returns:
        Promise<message : string, users : User[] | null>
    */
    const users = await this.userService.findAll();

    return {
      message : "Succesfully Fetched All Users",
      users
    }
  }

  // ===========================================JWT AUTH===================================================
  // @UseGuards(JwtAuthGuard)
  // @Post()
  // async create(@Body() createUserDto: CreateUserDto) : Promise<{message : string, user : UserDocument}>{
  //   /*
  //     Asynchornous handles Create User Service 

  //     Args:
  //       createUserDto (CreateUserDto) : Data Type Object for creating a user (email, password)

  //     Returns:
  //       Promise<message : string, user : User>
  //   */
   
  //  const user = await this.userService.create(createUserDto);
  //  return {
  //     message : "Succesfully Created User",
  //     user
  //   }
  // }
  
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  @Patch()
  async update(@UploadedFile() file : Express.Multer.File, @Req() req, @Body() updateUserDto: UpdateUserDto) : Promise<{message : string, user : UserDocument}> {
    /*
      Asynchornous handles Update User Service 
  
      Args:
        updateUserDto (UpdateUserDto) : Data Type Object for updating a user (email, password)
  
      Returns:
        Promise<message : string, user : User>
    */
   const user = await this.userService.update(req.user.userId, updateUserDto, file);

   return {
      message : "Succesfully Updated User",
      user
    }
  }
  
  @UseGuards(JwtAuthGuard)
  @Delete()
  async remove(@Req() req)  : Promise<{message : string}> {
    /*
      Asynchornous handles Remove User Service
  
      Args:
        None

      Returns:
        Promise<message : string>
    */
    await this.userService.remove(req.user.userId);
    
    return {
      message : "Succesfully Deleted User"
    };
  }
}
