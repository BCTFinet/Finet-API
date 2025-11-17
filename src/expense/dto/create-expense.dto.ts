import { IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateExpenseDto {
    @ApiProperty({ example: 'Groceries', description: 'Name of the expense' })
    @IsString()
    @IsNotEmpty()
    name : string;
    
    @ApiProperty({ example: 100, description: 'Price of the expense' })
    @IsInt()
    @IsNotEmpty()
    price : number;

    @ApiProperty({ example: 'Monthly grocery shopping', description: 'Additional notes about the expense' })
    @IsString()
    @IsOptional()
    note : string;
}