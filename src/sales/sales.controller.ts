import { Controller, Post, Body, Get } from '@nestjs/common';
import { SalesService } from './sales.service';
import { CreateSaleDto } from './dto/create-sale.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('sales') // Agrupa no Swagger
@Controller('sales')
export class SalesController {
  constructor(private readonly salesService: SalesService) {}

  @Post()
  @ApiOperation({ summary: 'Realiza uma venda com baixa automática de estoque (FEFO)' })
  @ApiResponse({ status: 201, description: 'Venda realizada com sucesso.' })
  @ApiResponse({ status: 400, description: 'Estoque insuficiente ou dados inválidos.' })
  create(@Body() createSaleDto: CreateSaleDto) {
    return this.salesService.create(createSaleDto);
  }

  @Get()
  @ApiOperation({ summary: 'Lista todas as vendas realizadas' })
  findAll() {
    return this.salesService.findAll();
  }
}