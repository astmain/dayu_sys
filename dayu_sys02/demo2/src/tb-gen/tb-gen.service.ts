import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { tbGenSchema, TbGen } from '../schemas/tb-gen.schema';

@Injectable()
export class TbGenService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async create(data: TbGen) {
    // Validate the data using Zod schema
    const validatedData = tbGenSchema.parse(data);

    // Create record in database using Prisma
    return this.prisma.tbGen.create({
      data: validatedData,
    });
  }

  async findAll() {
    return this.prisma.tbGen.findMany();
  }

  async findOne(id: number) {
    return this.prisma.tbGen.findUnique({
      where: { id },
    });
  }

  async update(id: number, data: Partial<TbGen>) {
    // Validate the data using Zod schema
    const validatedData = tbGenSchema.partial().parse(data);

    return this.prisma.tbGen.update({
      where: { id },
      data: validatedData,
    });
  }

  async remove(id: number) {
    return this.prisma.tbGen.delete({
      where: { id },
    });
  }
} 