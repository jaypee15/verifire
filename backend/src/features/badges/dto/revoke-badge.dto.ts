import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class RevokeBadgeDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  reason: string;
}
