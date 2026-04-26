import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsInt, IsDateString, IsUUID, Min } from 'class-validator';

export class CreateInventoryDto {
  @ApiProperty({ example: 'LT-URGENTE-001' })
  @IsString()
  @IsNotEmpty()
  batchNumber: string;

  @ApiProperty({ example: 10 })
  @IsInt()
  @Min(1)
  @IsNotEmpty()
  quantity: number;

  @ApiProperty({ example: '2026-05-10T12:00:00.000Z' })
  @IsDateString()
  @IsNotEmpty()
  expirationDate: string;

  @ApiProperty({ example: 'uuid-do-produto-aqui' })
  @IsUUID()
  @IsNotEmpty()
  productId: string;
}