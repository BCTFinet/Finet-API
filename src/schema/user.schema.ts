import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
    @Prop({unique : true, required : true})
    email: string;

    @Prop({default : null})
    password: string; 
    
    @Prop({default : null})
    username: string;
    
    @Prop({default : null})
    phone_number: number;
    
    @Prop({default : null})
    dob: Date;
    
    @Prop({default : null})
    profile_image: string;
}

export const UserSchema = SchemaFactory.createForClass(User);