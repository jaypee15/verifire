import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema({ timestamps: true })
export class BadgeAssertion extends Document {
  @Prop({ required: true })
  type: string[];

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Badge', required: true })
  badge: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  recipient: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  issuer: string;

  @Prop({ required: true })
  issuanceDate: Date;

  @Prop()
  expirationDate?: Date;

  @Prop({ default: false })
  revoked: boolean;

  @Prop()
  revocationReason?: string;

  @Prop()
  revokedAt?: Date;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  revokedBy?: string;

  @Prop({ type: Object, required: true })
  verification: {
    type: string;
    verificationProperty: string;
    startsWith: string;
  };

  @Prop({ required: true, unique: true })
  verificationId: string;
}

export const BadgeAssertionSchema =
  SchemaFactory.createForClass(BadgeAssertion);

// Add index for efficient expiration queries
BadgeAssertionSchema.index({ expirationDate: 1 });
