import { Injectable, NotFoundException } from '@nestjs/common';
import { IDevelopersRepository } from '../../domain/repositories/developersRepository.interface';
import { Developer } from 'src/domain/models/developers.model';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class DevelopersRepository implements IDevelopersRepository {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async getAll(): Promise<Developer[]> {
    return await this.prisma.developer.findMany();
  }

  async getById(id: number): Promise<Developer | NotFoundException> {
    const developer = await this.prisma.developer.findUnique({
      where: { id },
    });

    if (!developer) {
      return new NotFoundException('Level not found.')
    }

    return developer;
  }

  async register(developerData: Prisma.DeveloperCreateInput): Promise<Developer> {
    try {
      return await this.prisma.developer.create({
        data: developerData,
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new Error('A record with the given unique fields already exists.');
        }
      }
      throw error;
    }
  }

  // This updates the developer _partially_ (uses PATCH)
  async edit(id: number, developerData: Partial<Prisma.DeveloperUpdateInput>): Promise<Developer | NotFoundException> {
    const developer = await this.prisma.developer.findUnique({
      where: { id },
    });

    if (!developer) {
      return new NotFoundException('Level not found.')
    }

    return await this.prisma.developer.update({
      where: { id },
      data: {
        ...developerData,
      },
    });
  }

  // This updates the developer _entirely_ (uses PUT)
  async update(id: number, developerData: Prisma.DeveloperUpdateInput): Promise<Developer | NotFoundException> {
    const developer = await this.prisma.developer.findUnique({
      where: { id },
    });

    if (!developer) {
      return new NotFoundException('Level not found.')
    }

    return await this.prisma.developer.update({
      where: { id },
      data: developerData,
    });
  }

  async delete(id: number): Promise<number | NotFoundException> {
    try {
      await this.prisma.developer.delete({
        where: { id },
      })
      return id
    } catch(error){
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          return new NotFoundException('Level not found.')
        }
      }
      throw error;
    }
  }
}
