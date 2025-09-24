import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type ArticleDocument = HydratedDocument<Article>;

@Schema({timestamps: true})
export class Article {
    @Prop({ required: true })
    title: string;

    @Prop({ required: true })
    content: string;

    @Prop({ required: true })
    written_date: Date;

    @Prop({ required: true })
    author : string;
}

export const ArticleSchema = SchemaFactory.createForClass(Article);