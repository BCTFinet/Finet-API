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

    @ApiProperty({ example: '2023-04-01', description: 'Date of the expense' })
    @IsOptional()
    date : Date;

    // @ApiProperty({ description: 'Category ID associated with the expense' })
    // @IsString()
    // @IsNotEmpty()
    // category_id : string;

    @ApiProperty({ description: 'Wallet ID associated with the expense' })
    @IsString()
    @IsNotEmpty()
    wallet_id : string;
}