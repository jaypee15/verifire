import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BadgesController } from './badges.controller';
import { BadgesService } from './badges.service';
import { Badge, BadgeSchema } from './schemas/badge.schema';
import {
  BadgeAssertion,
  BadgeAssertionSchema,
} from './schemas/badge-assertion.schema';
import { AnalyticsService } from '../analytics/analytics.service';
import {
  BadgeAnalytics,
  BadgeAnalyticsSchema,
} from '../analytics/schemas/badge-analytics.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Badge.name, schema: BadgeSchema },
      { name: BadgeAssertion.name, schema: BadgeAssertionSchema },
      { name: BadgeAnalytics.name, schema: BadgeAnalyticsSchema },
    ]),
  ],
  controllers: [BadgesController],
  providers: [BadgesService, AnalyticsService],
  exports: [BadgesService],
})
export class BadgesModule {}
