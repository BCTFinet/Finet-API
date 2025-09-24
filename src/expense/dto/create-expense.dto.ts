import { Optional } from "@nestjs/common";
import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class CreateExpenseDto {
    @IsString()
    @IsNotEmpty()
    name : string;
    
    @IsInt()
    @IsNotEmpty()
    price : number;

    @IsString()
    @Optional()
    note : string;
}