import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Request,
  Patch,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { BadgesService } from './badges.service';
import { CreateBadgeDto } from './dto/create-badge.dto';
import { CreateTemplateDto } from './dto/create-template.dto';
import { IssueBadgeDto } from './dto/issue-badge.dto';
import { RevokeBadgeDto } from './dto/revoke-badge.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { IssuerGuard } from '../auth/guards/issuer.guard';
import { BatchIssueBadgeDto } from './dto/batch-issue-badge.dto';

@ApiTags('badges')
@Controller('badges')
export class BadgesController {
  constructor(private readonly badgesService: BadgesService) {}

  @Post('templates')
  @UseGuards(JwtAuthGuard, IssuerGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new badge template' })
  async createTemplate(
    @Body() createTemplateDto: CreateTemplateDto,
    @Request() req,
  ) {
    return this.badgesService.createTemplate(
      createTemplateDto,
      req.user.userId,
    );
  }

  @Get('templates')
  @UseGuards(JwtAuthGuard, IssuerGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'List all templates for the issuer' })
  async listTemplates(@Request() req) {
    return this.badgesService.listTemplates(req.user.userId);
  }

  @Post('templates/:templateId/create')
  @UseGuards(JwtAuthGuard, IssuerGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a badge from template' })
  async createFromTemplate(
    @Param('templateId') templateId: string,
    @Body() customizations: Partial<CreateBadgeDto>,
  ) {
    return this.badgesService.createBadgeFromTemplate(
      templateId,
      customizations,
    );
  }

  @Patch(':assertionId/revoke')
  @UseGuards(JwtAuthGuard, IssuerGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Revoke a badge' })
  async revokeBadge(
    @Param('assertionId') assertionId: string,
    @Body() revokeBadgeDto: RevokeBadgeDto,
    @Request() req,
  ) {
    return this.badgesService.revokeBadge(
      assertionId,
      revokeBadgeDto,
      req.user.userId,
    );
  }

  @Get('active')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'List active badges for the current user' })
  async listActiveBadges(@Request() req) {
    return this.badgesService.listActiveBadges(req.user.userId);
  }

  @Get('expired')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'List expired badges for the current user' })
  async listExpiredBadges(@Request() req) {
    return this.badgesService.listExpiredBadges(req.user.userId);
  }

  @Post()
  @UseGuards(JwtAuthGuard, IssuerGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new badge template' })
  @ApiResponse({
    status: 201,
    description: 'Badge template created successfully',
  })
  async createBadge(@Body() createBadgeDto: CreateBadgeDto, @Request() req) {
    return this.badgesService.createBadge({
      ...createBadgeDto,
      issuer: {
        id: req.user.userId,
        type: ['Profile'],
        name: req.user.name,
      },
    });
  }

  @Post('issue')
  @UseGuards(JwtAuthGuard, IssuerGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Issue a badge to a recipient' })
  @ApiResponse({ status: 201, description: 'Badge issued successfully' })
  async issueBadge(@Body() issueBadgeDto: IssueBadgeDto, @Request() req) {
    return this.badgesService.issueBadge(issueBadgeDto, req.user.userId);
  }

  @Get('verify/:id')
  @ApiOperation({ summary: 'Verify a badge' })
  @ApiResponse({ status: 200, description: 'Badge verification successful' })
  async verifyBadge(@Param('id') id: string) {
    return this.badgesService.verifyBadge(id);
  }

  @Post('batch-issue')
  @UseGuards(JwtAuthGuard, IssuerGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Issue badges to multiple recipients' })
  @ApiResponse({ status: 201, description: 'Badges issued successfully' })
  async batchIssueBadges(
    @Body() batchIssueBadgeDto: BatchIssueBadgeDto,
    @Request() req,
  ) {
    return this.badgesService.batchIssueBadges(
      batchIssueBadgeDto,
      req.user.userId,
    );
  }
}
