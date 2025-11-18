import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Types } from "mongoose";

import{ ApiProperty } from "@nestjs/swagger";

export class CreateWalletDto {
    @ApiProperty({ example : "BCA", description : "Name of the Wallet" })
    @IsString()
    @IsNotEmpty()
    name : string;

    @ApiProperty({ example : "0", description : "Wallet Balance" })
    @IsNumber()
    @IsNotEmpty()
    balance : number;
}
