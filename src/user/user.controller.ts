import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { UserService } from './user.service';
// import { CreateUserDto } from './dto/create-user.dto';
// import { Types } from 'mongoose';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { UserDocument } from 'src/schema/user.schema';
import { UpdateUserDto } from './dto/update-user.dto';

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
  @Patch()
  async update(@Req() req, @Body() updateUserDto: UpdateUserDto) : Promise<{message : string, user : UserDocument}> {
    /*
      Asynchornous handles Update User Service 
  
      Args:
        updateUserDto (UpdateUserDto) : Data Type Object for updating a user (email, password)
  
      Returns:
        Promise<message : string, user : User>
    */
   const user = await this.userService.update(req.user.userId, updateUserDto);

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
