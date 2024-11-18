import { ApiProperty } from '@nestjs/swagger';
import {
  IsMongoId,
  IsArray,
  ValidateNested,
  IsOptional,
  IsString,
} from 'class-validator';
import { Type } from 'class-transformer';

class BatchRecipient {
  @ApiProperty({
    example: '507f1f77bcf86cd799439011',
    description: 'MongoDB ID of the recipient user',
  })
  @IsMongoId()
  recipientId: string;

  @ApiProperty({
    example: 'Congratulations on completing the advanced JavaScript course!',
    description: 'Optional custom message for the recipient',
    required: false,
  })
  @IsString()
  @IsOptional()
  customMessage?: string;
}

export class BatchIssueBadgeDto {
  @ApiProperty({
    example: '507f1f77bcf86cd799439012',
    description: 'MongoDB ID of the badge to be issued',
  })
  @IsMongoId()
  badgeId: string;

  @ApiProperty({
    type: [BatchRecipient],
    example: [
      {
        recipientId: '507f1f77bcf86cd799439011',
        customMessage: 'Congratulations on your achievement!',
      },
      {
        recipientId: '507f1f77bcf86cd799439013',
      },
    ],
    description: 'Array of recipients to receive the badge',
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => BatchRecipient)
  recipients: BatchRecipient[];
}
