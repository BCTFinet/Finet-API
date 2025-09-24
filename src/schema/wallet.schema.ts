import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";

export type WalletDocument = HydratedDocument<Wallet>;

@Schema()
export class Wallet {
    @Prop({required : true})
    name : string;

    @Prop({type: Types.ObjectId, ref: "User", required : true})
    user_id : Types.ObjectId;
}

export const WalletSchema = SchemaFactory.createForClass(Wallet);