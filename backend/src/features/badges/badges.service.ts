import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ConfigService } from '@nestjs/config';
import { Badge } from './schemas/badge.schema';
import { BadgeAssertion } from './schemas/badge-assertion.schema';
import { CreateBadgeDto } from './dto/create-badge.dto';
import { CreateTemplateDto } from './dto/create-template.dto';
import { IssueBadgeDto } from './dto/issue-badge.dto';
import { RevokeBadgeDto } from './dto/revoke-badge.dto';
import { v4 as uuidv4 } from 'uuid';
import { BatchIssueBadgeDto } from './dto/batch-issue-badge.dto';
import { AnalyticsService } from '../analytics/analytics.service';

@Injectable()
export class BadgesService {
  constructor(
    @InjectModel(Badge.name) private badgeModel: Model<Badge>,
    @InjectModel(BadgeAssertion.name)
    private assertionModel: Model<BadgeAssertion>,
    private configService: ConfigService,
    private analyticsService: AnalyticsService,
  ) {}

  async createBadge(createBadgeDto: CreateBadgeDto): Promise<Badge> {
    const badge = new this.badgeModel({
      ...createBadgeDto,
      type: ['Badge'],
      verification: {
        type: 'VerifiableCredential',
        verificationProperty: 'id',
        startsWith: this.configService.get<string>('verification.url'),
      },
    });
    return badge.save();
  }

  async createTemplate(
    createTemplateDto: CreateTemplateDto,
    userId: string,
  ): Promise<Badge> {
    const template = new this.badgeModel({
      ...createTemplateDto,
      type: ['BadgeTemplate'],
      isTemplate: true,
      issuer: {
        id: userId,
        type: ['Profile'],
      },
    });
    return template.save();
  }

  async listTemplates(userId: string): Promise<Badge[]> {
    return this.badgeModel.find({
      'issuer.id': userId,
      isTemplate: true,
    });
  }

  async createBadgeFromTemplate(
    templateId: string,
    customizations: Partial<CreateBadgeDto>,
  ): Promise<Badge> {
    const template = await this.badgeModel.findOne({
      _id: templateId,
      isTemplate: true,
    });
    if (!template) {
      throw new NotFoundException('Template not found');
    }

    const badge = new this.badgeModel({
      ...template.toObject(),
      ...customizations,
      isTemplate: false,
      type: ['Badge'],
      verification: {
        type: 'VerifiableCredential',
        verificationProperty: 'id',
        startsWith: this.configService.get<string>('verification.url'),
      },
    });

    return badge.save();
  }

  async issueBadge(
    issueBadgeDto: IssueBadgeDto,
    issuerId: string,
  ): Promise<BadgeAssertion> {
    const badge = await this.badgeModel.findById(issueBadgeDto.badgeId);
    if (!badge) {
      throw new NotFoundException('Badge not found');
    }

    const expirationDate = badge.validityPeriod
      ? new Date(Date.now() + badge.validityPeriod * 24 * 60 * 60 * 1000)
      : undefined;

    const assertion = new this.assertionModel({
      type: ['Assertion', 'VerifiableCredential'],
      badge: issueBadgeDto.badgeId,
      recipient: issueBadgeDto.recipientId,
      issuer: issuerId,
      issuanceDate: new Date(),
      expirationDate,
      verification: badge.verification,
      verificationId: uuidv4(),
    });

    return assertion.save();
  }

  async revokeBadge(
    assertionId: string,
    revokeBadgeDto: RevokeBadgeDto,
    userId: string,
  ): Promise<BadgeAssertion> {
    const assertion = await this.assertionModel.findById(assertionId);
    if (!assertion) {
      throw new NotFoundException('Badge assertion not found');
    }

    if (assertion.issuer.toString() !== userId) {
      throw new UnauthorizedException('Only the issuer can revoke this badge');
    }

    assertion.revoked = true;
    assertion.revocationReason = revokeBadgeDto.reason;
    assertion.revokedAt = new Date();
    assertion.revokedBy = userId;

    return assertion.save();
  }

  async verifyBadge(verificationId: string): Promise<BadgeAssertion> {
    const assertion = await this.assertionModel
      .findOne({ verificationId })
      .populate('badge')
      .populate('recipient')
      .populate('issuer');

    if (!assertion) {
      throw new NotFoundException('Badge assertion not found');
    }

    // Check if badge is expired
    if (assertion.expirationDate && assertion.expirationDate < new Date()) {
      throw new UnauthorizedException('Badge has expired');
    }

    // Check if badge is revoked
    if (assertion.revoked) {
      throw new UnauthorizedException(
        `Badge has been revoked. Reason: ${assertion.revocationReason}`,
      );
    }

    return assertion;
  }

  async listExpiredBadges(userId: string): Promise<BadgeAssertion[]> {
    return this.assertionModel
      .find({
        recipient: userId,
        expirationDate: { $lt: new Date() },
      })
      .populate('badge');
  }

  async listActiveBadges(userId: string): Promise<BadgeAssertion[]> {
    return this.assertionModel
      .find({
        recipient: userId,
        revoked: false,
        $or: [
          { expirationDate: { $gt: new Date() } },
          { expirationDate: null },
        ],
      })
      .populate('badge');
  }

  async batchIssueBadges(
    batchIssueBadgeDto: BatchIssueBadgeDto,
    issuerId: string,
  ): Promise<BadgeAssertion[]> {
    const badge = await this.badgeModel.findById(batchIssueBadgeDto.badgeId);
    if (!badge) {
      throw new NotFoundException('Badge not found');
    }

    const expirationDate = badge.validityPeriod
      ? new Date(Date.now() + badge.validityPeriod * 24 * 60 * 60 * 1000)
      : undefined;

    const assertions = await Promise.all(
      batchIssueBadgeDto.recipients.map(async (recipient) => {
        const assertion = new this.assertionModel({
          type: ['Assertion', 'VerifiableCredential'],
          badge: batchIssueBadgeDto.badgeId,
          recipient: recipient.recipientId,
          issuer: issuerId,
          issuanceDate: new Date(),
          expirationDate,
          verification: badge.verification,
          verificationId: uuidv4(),
          customData: recipient.customMessage
            ? { message: recipient.customMessage }
            : undefined,
        });

        return assertion.save();
      }),
    );

    // Update analytics after batch issuance
    await this.analyticsService.updateBadgeAnalytics(
      batchIssueBadgeDto.badgeId,
      issuerId,
    );

    return assertions;
  }
}
