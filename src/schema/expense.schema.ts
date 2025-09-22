import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type ExpenseDocument = HydratedDocument<Expense>;

@Schema({timestamps : true})
export class Expense {
    @Prop({required : true})
    name : string;

    @Prop({required: true})
    price : number;

    @Prop({required: true})
    user_id : string;
}

export const ExpenseSchema = SchemaFactory.createForClass(Expense);