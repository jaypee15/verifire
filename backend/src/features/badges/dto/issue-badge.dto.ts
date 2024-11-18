import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsMongoId } from 'class-validator';

export class IssueBadgeDto {
  @ApiProperty()
  @IsMongoId()
  badgeId: string;

  @ApiProperty()
  @IsMongoId()
  recipientId: string;
}
