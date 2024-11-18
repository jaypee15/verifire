import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BadgeAnalytics } from './schemas/badge-analytics.schema';
import { BadgeAssertion } from '../badges/schemas/badge-assertion.schema';
import { Badge } from '../badges/schemas/badge.schema';

@Injectable()
export class AnalyticsService {
  constructor(
    @InjectModel(BadgeAnalytics.name)
    private analyticsModel: Model<BadgeAnalytics>,
    @InjectModel(BadgeAssertion.name)
    private assertionModel: Model<BadgeAssertion>,
    @InjectModel(Badge.name)
    private badgeModel: Model<Badge>,
  ) {}

  async updateBadgeAnalytics(badgeId: string, issuerId: string): Promise<void> {
    const [totalIssued, activeCount, revokedCount, expiredCount] =
      await Promise.all([
        this.assertionModel.countDocuments({ badge: badgeId }),
        this.assertionModel.countDocuments({
          badge: badgeId,
          revoked: false,
          $or: [
            { expirationDate: { $gt: new Date() } },
            { expirationDate: null },
          ],
        }),
        this.assertionModel.countDocuments({
          badge: badgeId,
          revoked: true,
        }),
        this.assertionModel.countDocuments({
          badge: badgeId,
          expirationDate: { $lt: new Date() },
        }),
      ]);

    const monthlyIssuance = await this.getMonthlyIssuanceData(badgeId);
    const popularTags = await this.getPopularTags(badgeId);

    await this.analyticsModel.findOneAndUpdate(
      { badgeId, issuerId },
      {
        totalIssued,
        activeCount,
        revokedCount,
        expiredCount,
        monthlyIssuance,
        popularTags,
      },
      { upsert: true },
    );
  }

  private async getMonthlyIssuanceData(
    badgeId: string,
  ): Promise<Map<string, number>> {
    const monthlyData = await this.assertionModel.aggregate([
      { $match: { badge: badgeId } },
      {
        $group: {
          _id: {
            year: { $year: '$issuanceDate' },
            month: { $month: '$issuanceDate' },
          },
          count: { $sum: 1 },
        },
      },
    ]);

    const monthlyMap = new Map<string, number>();
    monthlyData.forEach((item) => {
      const key = `${item._id.year}-${item._id.month.toString().padStart(2, '0')}`;
      monthlyMap.set(key, item.count);
    });

    return monthlyMap;
  }

  private async getPopularTags(badgeId: string): Promise<string[]> {
    const badge = await this.badgeModel.findById(badgeId);
    return badge?.tags || [];
  }

  async getIssuerAnalytics(issuerId: string) {
    const [totalBadges, totalIssuances, activeIssuances] = await Promise.all([
      this.badgeModel.countDocuments({ 'issuer.id': issuerId }),
      this.assertionModel.countDocuments({ issuer: issuerId }),
      this.assertionModel.countDocuments({
        issuer: issuerId,
        revoked: false,
        $or: [
          { expirationDate: { $gt: new Date() } },
          { expirationDate: null },
        ],
      }),
    ]);

    const popularBadges = await this.assertionModel.aggregate([
      { $match: { issuer: issuerId } },
      { $group: { _id: '$badge', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 },
      {
        $lookup: {
          from: 'badges',
          localField: '_id',
          foreignField: '_id',
          as: 'badge',
        },
      },
      { $unwind: '$badge' },
    ]);

    return {
      totalBadges,
      totalIssuances,
      activeIssuances,
      popularBadges: popularBadges.map((item) => ({
        badge: item.badge,
        issuanceCount: item.count,
      })),
    };
  }
}
