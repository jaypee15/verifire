import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsArray, IsBoolean } from 'class-validator';

export class CreateTemplateDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty()
  @IsString()
  image: string;

  @ApiProperty({ required: false })
  @IsArray()
  @IsOptional()
  tags?: string[];

  @ApiProperty({ required: false })
  @IsOptional()
  criteria?: {
    narrative?: string;
    achievementType?: string;
  };

  @ApiProperty()
  @IsBoolean()
  isTemplate: boolean;

  @ApiProperty({ required: false })
  @IsOptional()
  validityPeriod?: number; // in days
}
