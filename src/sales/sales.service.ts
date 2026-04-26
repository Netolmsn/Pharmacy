import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSaleDto } from './dto/create-sale.dto';

@Injectable()
export class SalesService {
  constructor(private prisma: PrismaService) {}

  async create(createSaleDto: CreateSaleDto) {
    return this.prisma.$transaction(async (tx) => {
      let totalAmount = 0;
      const saleItemsData: { batchId: string; quantity: number; price: any }[] = [];

      for (const item of createSaleDto.items) {
        const product = await tx.product.findUnique({
          where: { id: item.productId },
          include: { 
            batches: { 
              where: { quantity: { gt: 0 } }, 
              orderBy: { expirationDate: 'asc' } 
            } 
          },
        });

        if (!product) {
          throw new BadRequestException(`Produto com ID ${item.productId} não encontrado`);
        }

        const totalStock = product.batches.reduce((sum, b) => sum + b.quantity, 0);
        if (totalStock < item.quantity) {
          throw new BadRequestException(`Estoque insuficiente para ${product.name}. Disponível: ${totalStock}`);
        }

        let remainingToSell = item.quantity;

        for (const batch of product.batches) {
          if (remainingToSell <= 0) break;

          const amountFromThisBatch = Math.min(batch.quantity, remainingToSell);
          
          await tx.batch.update({
            where: { id: batch.id },
            data: { quantity: { decrement: amountFromThisBatch } },
          });

          saleItemsData.push({
            batchId: batch.id,
            quantity: amountFromThisBatch,
            price: product.price,
          });

          totalAmount += Number(product.price) * amountFromThisBatch;
          remainingToSell -= amountFromThisBatch;
        }
      }

      return tx.sale.create({
        data: {
          totalAmount,
          items: {
            create: saleItemsData,
          },
        },
        include: { items: true },
      });
    });
  }

  async findAll() {
    return this.prisma.sale.findMany({
      include: { 
        items: { 
          include: { 
            batch: { 
              include: { product: true } 
            } 
          } 
        } 
      },
    });
  }

  async getDailyReport() {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    const stats = await this.prisma.sale.aggregate({
      where: {
        createdAt: {
          gte: startOfDay,
          lte: endOfDay,
        },
      },
      _sum: {
        totalAmount: true,
      },
      _count: {
        id: true,
      },
    });

    return {
      date: startOfDay.toLocaleDateString(),
      totalSales: stats._count.id,
      totalRevenue: stats._sum.totalAmount || 0,
    };
  }
}