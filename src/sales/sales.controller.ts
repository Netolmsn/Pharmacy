import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { SalesService } from './sales.service';
import { CreateSaleDto } from './dto/create-sale.dto';
import { ApiBearerAuth, ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';

@ApiTags('sales')
@ApiBearerAuth()
@Controller('sales')
export class SalesController {
  constructor(private readonly salesService: SalesService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Realiza uma venda com baixa automática de estoque (FEFO)' })
  create(@Body() createSaleDto: CreateSaleDto) {
    return this.salesService.create(createSaleDto);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Lista todas as vendas realizadas' })
  findAll() {
    return this.salesService.findAll();
  }

  @Get('report/daily')
  @Roles('ADMIN')
  @UseGuards(AuthGuard('jwt'), RolesGuard) 
  @ApiOperation({ summary: 'Relatório de faturamento do dia atual (Apenas ADMIN)' })
  async getDailyReport() {
    return this.salesService.getDailyReport();
  }
}