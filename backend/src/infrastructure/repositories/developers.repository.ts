import { Injectable } from '@nestjs/common';
import { IDevelopersRepository } from '../../domain/repositories/developersRepository.interface';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import {
  RepositoryToServiceDeveloperDto
} from '../../application/dtos/repositoryToServiceDeveloper.dto';

@Injectable()
export class DevelopersRepository implements IDevelopersRepository {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async getAll(): Promise<RepositoryToServiceDeveloperDto[]> {
    return this.prisma.developer.findMany({
      include: {
        nivel: true
      }
    });
  }

  async getById(id: number): Promise<RepositoryToServiceDeveloperDto | null> {
    return this.prisma.developer.findUnique({
      where: { id },
      include: {
        nivel: true
      }
    });
  }

  async create(developerData: Prisma.DeveloperUncheckedCreateInput): Promise<RepositoryToServiceDeveloperDto> {
    return this.prisma.developer.create({
      data: {
        ...developerData
      },
      include: {
        nivel: true
      }
    });
  }

  async update(id: number, developerData: Prisma.DeveloperUncheckedUpdateInput): Promise<RepositoryToServiceDeveloperDto> {
    return this.prisma.developer.update({
      where: { id },
      data: developerData,
      include: {
        nivel: true
      }
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
