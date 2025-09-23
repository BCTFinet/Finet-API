import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class ExpenseDto {
    @IsString()
    @IsNotEmpty()
    name : string;
    
    @IsInt()
    @IsNotEmpty()
    price : number;
}