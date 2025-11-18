import { IsDate, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
    @ApiProperty({ example: 'user@example.com', description: 'The email of the user', required: true })
    @IsString()
    @IsEmail()
    @IsNotEmpty()
    email : string;
    
    @ApiProperty({ example: 'strongPassword123', description: 'The password of the user', required: true })
    @IsString()
    @IsNotEmpty()
    password : string;

    @ApiProperty({ example: 'Andi', description: 'The username of the user', required: false })
    @IsOptional()
    @IsString()
    username: string;
    
    @ApiProperty({ example: 1234567890, description: 'The phone number of the user', required: false })
    @IsOptional()
    @IsNumber()
    phone_number: number;

    @ApiProperty({ example: '1990-01-01', description: 'The date of birth of the user', required: false })
    @IsOptional()
    @IsDate()
    dob: Date;

    @ApiProperty({ description: 'Profile Picture', required: false })
    @IsOptional()
    @IsString()
    profile_image: string;
}
