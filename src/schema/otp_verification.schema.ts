import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type OtpVerificationDocument = HydratedDocument<OtpVerification>;

@Schema({ collection: 'otp_verification' })
export class OtpVerification {
    @Prop({ required: true })
    email: string;

    @Prop({ required: true })
    otpHashed: string;

    @Prop({ required: true})
    expiresAt: Date;

    @Prop({required: true, enum: ['EMAIL_VERIFICATION', 'PASSWORD_RESET']})
    purpose: string;
}

export const OtpVerificationSchema = SchemaFactory.createForClass(OtpVerification);