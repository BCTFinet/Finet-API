import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";

export type ExpenseDocument = HydratedDocument<Expense>;

@Schema({timestamps : true})
export class Expense {
    @Prop({ type: Types.ObjectId, ref: 'User', required: true })
    user_id : Types.ObjectId;

    // @Prop({ type: Types.ObjectId, ref: 'Category', required: true })
    // category_id : Types.ObjectId;

    @Prop({ type: Types.ObjectId, ref: 'Wallet', required: true })
    wallet_id : Types.ObjectId;

    @Prop({ type: Date, default: Date.now })
    date : Date;

    @Prop({required : true})
    name : string;

    @Prop({required: true})
    price : number;

    @Prop()
    note : string;
}

export const ExpenseSchema = SchemaFactory.createForClass(Expense);