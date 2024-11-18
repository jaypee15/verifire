import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Badge extends Document {
  @Prop({ required: true })
  type: string[];

  @Prop({ required: true })
  name: string;

  @Prop()
  description?: string;

  @Prop({ required: true })
  image: string;

  @Prop({ type: Object, required: true })
  issuer: {
    id: string;
    type: string[];
    name: string;
    url?: string;
    email?: string;
  };

  @Prop({ type: Object })
  criteria?: {
    narrative?: string;
    achievementType?: string;
  };

  @Prop()
  tags?: string[];

  @Prop({ type: Object })
  verification: {
    type: string;
    verificationProperty: string;
    startsWith: string;
  };

  @Prop({ type: Number })
  validityPeriod?: number; // Duration in days

  @Prop({ type: Boolean, default: false })
  isTemplate: boolean;
}

export const BadgeSchema = SchemaFactory.createForClass(Badge);
