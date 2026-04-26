import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateInventoryDto } from './dto/create-inventory.dto';

@Injectable()
export class InventoryService {
  constructor(private prisma: PrismaService) {}

  async create(createInventoryDto: CreateInventoryDto) {
    return this.prisma.batch.create({
      data: {
        batchNumber: createInventoryDto.batchNumber,
        quantity: createInventoryDto.quantity,
        expirationDate: new Date(createInventoryDto.expirationDate),
        productId: createInventoryDto.productId,
      },
    });
  }

  async findAll() {
    return this.prisma.batch.findMany({
      include: { product: true },
    });
  }
}