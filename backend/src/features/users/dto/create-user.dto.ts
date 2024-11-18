import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsString,
  MinLength,
  IsOptional,
  IsBoolean,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty({ required: false })
  @IsBoolean()
  @IsOptional()
  isIssuer?: boolean;

  @ApiProperty({ required: false })
  @IsOptional()
  issuerProfile?: {
    organizationName: string;
    website?: string;
    description?: string;
  };
}
