import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";

export type ExpenseDocument = HydratedDocument<Expense>;

@Schema({timestamps : true})
export class Expense {
    @Prop({ type: Types.ObjectId, ref: 'User', required: true })
    user_id : Types.ObjectId;

    @Prop({required : true})
    name : string;

    @Prop({required: true})
    price : number;
}

export const ExpenseSchema = SchemaFactory.createForClass(Expense);