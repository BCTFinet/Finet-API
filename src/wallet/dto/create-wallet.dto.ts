import { IsNotEmpty, IsString } from "class-validator";
import { Types } from "mongoose";

export class CreateWalletDto {
    @IsString()
    @IsNotEmpty()
    name : string;
}
