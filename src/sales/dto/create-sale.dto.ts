import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsInt, IsNotEmpty, IsUUID, ValidateNested, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateSaleItemDto {
  @ApiProperty({ example: 'uuid-do-produto-aqui', description: 'ID único do medicamento' })
  @IsUUID()
  @IsNotEmpty()
  productId: string;

  @ApiProperty({ example: 2, description: 'Quantidade a ser vendida' })
  @IsInt()
  @Min(1)
  quantity: number;
}

export class CreateSaleDto {
  @ApiProperty({ type: [CreateSaleItemDto], description: 'Lista de itens da venda' })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateSaleItemDto)
  items: CreateSaleItemDto[];
}