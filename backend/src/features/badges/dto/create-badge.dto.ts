import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  IsArray,
  IsUrl,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class Issuer {
  @IsString()
  id: string;

  @IsArray()
  type: string[];

  @IsString()
  name: string;
}

export class CreateBadgeDto {
  @ApiProperty({
    example: 'JavaScript Expert',
    description: 'The name of the badge',
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: 'Awarded for demonstrating advanced JavaScript programming skills',
    description: 'A detailed description of what the badge represents',
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    example: 'https://example.com/badges/js-expert.png',
    description: 'URL to the badge image. Must be a publicly accessible URL',
  })
  @IsString()
  @IsUrl()
  image: string;

  @ApiProperty({
    example: ['javascript', 'programming', 'web-development'],
    description: 'Tags to categorize the badge',
    required: false,
  })
  @IsArray()
  @IsOptional()
  tags?: string[];

  @ApiProperty({
    example: {
      narrative: 'Recipient has demonstrated expertise in JavaScript...',
      achievementType: 'Certification',
    },
    description: 'Criteria for earning the badge',
    required: false,
  })
  @IsOptional()
  criteria?: {
    narrative?: string;
    achievementType?: string;
  };

  @IsOptional()
  @ValidateNested()
  @Type(() => Issuer)
  issuer?: Issuer;
}
