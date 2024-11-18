import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AnalyticsController } from './analytics.controller';
import { AnalyticsService } from './analytics.service';
import {
  BadgeAnalytics,
  BadgeAnalyticsSchema,
} from './schemas/badge-analytics.schema';
import { Badge, BadgeSchema } from '../badges/schemas/badge.schema';
import {
  BadgeAssertion,
  BadgeAssertionSchema,
} from '../badges/schemas/badge-assertion.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: BadgeAnalytics.name, schema: BadgeAnalyticsSchema },
      { name: Badge.name, schema: BadgeSchema },
      { name: BadgeAssertion.name, schema: BadgeAssertionSchema },
    ]),
  ],
  controllers: [AnalyticsController],
  providers: [AnalyticsService],
  exports: [AnalyticsService],
})
export class AnalyticsModule {}
