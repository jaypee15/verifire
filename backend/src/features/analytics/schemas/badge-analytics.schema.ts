import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema({ timestamps: true })
export class BadgeAnalytics extends Document {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Badge', required: true })
  badgeId: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  issuerId: string;

  @Prop({ required: true })
  totalIssued: number;

  @Prop({ required: true })
  activeCount: number;

  @Prop({ required: true })
  revokedCount: number;

  @Prop({ required: true })
  expiredCount: number;

  @Prop({ type: Map, of: Number })
  monthlyIssuance: Map<string, number>;

  @Prop({ type: [String] })
  popularTags: string[];
}

export const BadgeAnalyticsSchema =
  SchemaFactory.createForClass(BadgeAnalytics);
