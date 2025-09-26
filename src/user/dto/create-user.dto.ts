import { IsDate, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateUserDto {
    @IsString()
    @IsEmail()
    @IsNotEmpty()
    email : string;
    
    @IsString()
    @IsNotEmpty()
    password : string;

    @IsOptional()
    @IsString()
    username: string;
    
    @IsOptional()
    @IsNumber()
    phone_number: number;

    @IsOptional()
    @IsDate()
    dob: Date;

    @IsOptional()
    @IsString()
    profile_image: string;
}
