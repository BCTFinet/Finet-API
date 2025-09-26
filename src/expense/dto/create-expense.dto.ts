import { IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateExpenseDto {
    @IsString()
    @IsNotEmpty()
    name : string;
    
    @IsInt()
    @IsNotEmpty()
    price : number;

    @IsString()
    @IsOptional()
    note : string;
}