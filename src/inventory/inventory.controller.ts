import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { UpdateInventoryDto } from './dto/update-inventory.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger'; // Adicione esta linha

@ApiTags('inventory')
@Controller('inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Get('expiring-soon')
  @ApiOperation({ summary: 'Lista lotes que vencem nos próximos 30 dias' })
  @ApiResponse({ status: 200, description: 'Lista de lotes próximos ao vencimento retornada com sucesso.' })
  findExpiringSoon() {
    return this.inventoryService.getExpiringSoon();
  }

  @Post()
  @ApiOperation({ summary: 'Cadastra um novo lote para um produto' })
  create(@Body() createInventoryDto: CreateInventoryDto) {
    return this.inventoryService.create(createInventoryDto);
  }

  @Get()
  @ApiOperation({ summary: 'Lista todos os lotes do sistema' })
  findAll() {
    return this.inventoryService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Busca um lote específico pelo ID' })
  findOne(@Param('id') id: string) {
    return this.inventoryService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualiza os dados de um lote' })
  update(@Param('id') id: string, @Body() updateInventoryDto: UpdateInventoryDto) {
    return this.inventoryService.update(id, updateInventoryDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove um lote do sistema' })
  remove(@Param('id') id: string) {
    return this.inventoryService.remove(id);
  }
}