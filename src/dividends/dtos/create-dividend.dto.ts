import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Currency } from '@prisma/client';
import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateDividendRequest {
  @ApiProperty({ description: '배당일' })
  @IsDateString()
  @IsNotEmpty()
  dividendAt!: string;

  @ApiProperty({ description: '주식종목' })
  @IsString()
  @IsNotEmpty()
  companyName!: string;

  @ApiProperty({ enum: Currency, description: '화폐' })
  @IsEnum(Currency)
  currency!: Currency;

  @ApiProperty({ description: '배당금' })
  @IsNumber()
  dividend!: number;

  @ApiPropertyOptional({ description: '세금' })
  @IsNumber()
  @IsOptional()
  tax?: number;
}
