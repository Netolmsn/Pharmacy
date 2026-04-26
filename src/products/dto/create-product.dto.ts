import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({ example: 'Dipirona 500mg', description: 'Nome do medicamento' })
  name: string;

  @ApiProperty({ example: 'Analgésico comum', required: false })
  description?: string;

  @ApiProperty({ example: 15.50 })
  price: number;

  @ApiProperty({ example: 'MED-DIP-500' })
  sku: string;

  @ApiProperty({ example: 'Analgésicos' })
  category: string;
}