import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { AnalyticsService } from './analytics.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { IssuerGuard } from '../auth/guards/issuer.guard';

@ApiTags('analytics')
@Controller('analytics')
@UseGuards(JwtAuthGuard, IssuerGuard)
@ApiBearerAuth()
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get('issuer')
  @ApiOperation({ summary: 'Get issuer analytics' })
  @ApiResponse({ status: 200, description: 'Analytics retrieved successfully' })
  async getIssuerAnalytics(@Request() req) {
    return this.analyticsService.getIssuerAnalytics(req.user.userId);
  }
}
