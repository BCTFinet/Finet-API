import { Controller, Get, Body, Patch, Delete, UseGuards, Req, UseInterceptors, UploadedFile } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/guards/auth.guard';
import { UserDocument } from 'src/schema/user.schema';
import { UpdateUserDto } from './dto/update-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';

import { ApiBadRequestResponse, ApiBearerAuth, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Users')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  
  @ApiOperation({ summary: 'Get all users' })
  @ApiOkResponse({
    description: 'Successfully fetched all users.',
    isArray: true
  })
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
  
  @ApiOperation({ summary: 'Update user profile information' })
  @ApiOkResponse({
    description: 'Successfully updated user profile information.',
    type: UpdateUserDto
  })
  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiBadRequestResponse({ description: 'Invalid user data' })
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
  
  @ApiOperation({ summary: 'Delete User' })
  @ApiOkResponse({ description: 'Successfully deleted user.'})
  @ApiNotFoundResponse({ description: 'User not found' })
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
