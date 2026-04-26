import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({ example: 'Amoxicilina 500mg' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'Antibiótico', required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ example: 50.00 })
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @ApiProperty({ example: 'AMX-001' })
  @IsString()
  @IsNotEmpty()
  sku: string;

  @ApiProperty({ example: 'Antibióticos' })
  @IsString()
  @IsNotEmpty()
  category: string;
}