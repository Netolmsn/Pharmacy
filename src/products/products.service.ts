import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async create(createProductDto: CreateProductDto) {
    return this.prisma.product.create({
      data: createProductDto,
    });
  }

  async findAll() {
    return this.prisma.product.findMany({
      include: { batches: true },
    });
  }

  async findOne(id: string) {
    const product = await this.prisma.product.findUnique({
      where: { id },
      include: { batches: true },
    });
    if (!product) throw new NotFoundException('Produto não encontrado');
    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    return this.prisma.product.update({
      where: { id },
      data: updateProductDto,
    });
  }

  async remove(id: string) {
    return this.prisma.product.delete({
      where: { id },
    });
  }

  async getExpiringSoon() {
    const today = new Date();
    const alertLimit = new Date();
    alertLimit.setDate(today.getDate() + 30);

    return this.prisma.batch.findMany({
      where: {
        expirationDate: {
          gte: today,
          lte: alertLimit,
        },
        quantity: { gt: 0 },
      },
      include: { product: true },
      orderBy: { expirationDate: 'asc' },
    });
  }
}