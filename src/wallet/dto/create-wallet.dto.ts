import { IsNotEmpty, IsString } from "class-validator";
import { Types } from "mongoose";

import{ ApiProperty } from "@nestjs/swagger";

export class CreateWalletDto {
    @ApiProperty({ example : "BCA", description : "Name of the Wallet" })
    @IsString()
    @IsNotEmpty()
    name : string;
}
