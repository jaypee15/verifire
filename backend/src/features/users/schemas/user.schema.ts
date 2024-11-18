import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class User extends Document {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  name: string;

  @Prop({ default: false })
  isIssuer: boolean;

  @Prop({ type: Object })
  issuerProfile?: {
    organizationName: string;
    website?: string;
    description?: string;
  };
}

export const UserSchema = SchemaFactory.createForClass(User);
