import { Injectable } from '@nestjs/common';
import { IDevelopersRepository } from '../../domain/repositories/developersRepository.interface';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, Developer } from '@prisma/client';
import {
  DeveloperRepositoryToServiceDto
} from '../../application/dtos/developerRepositoryToService.dto';

@Injectable()
export class DevelopersRepository implements IDevelopersRepository {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async getAll(): Promise<Developer[]> {
    return this.prisma.developer.findMany();
  }

  async getById(id: number): Promise<Developer | null> {
    return this.prisma.developer.findUnique({
      where: { id },
    });
  }

  async create(developerData: Prisma.DeveloperUncheckedCreateInput): Promise<DeveloperRepositoryToServiceDto> {
    return this.prisma.developer.create({
      data: {
        ...developerData
      },
      include: {
        nivel: true
      }
    });
  }

  async update(id: number, developerData: Prisma.DeveloperUpdateInput): Promise<Developer> {
    return this.prisma.developer.update({
      where: { id },
      data: developerData,
    });
  }

  async delete(id: number): Promise<boolean> {
    try {
      await this.prisma.developer.delete({
        where: { id },
      });
      return true;
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === 'P2025') { //this means not found
        return false;
      }
      throw e;
    }
  }
}
