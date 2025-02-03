import { Injectable } from '@nestjs/common';
import { Levels } from 'src/domain/models/levels.model';
import { ILevelsRepository } from '../../domain/repositories/levelsRepository.interface';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { Developer } from '../../domain/models/developers.model';

@Injectable()
export class LevelsRepository implements ILevelsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getAll(): Promise<Levels[] | null> {
    return await this.prisma.levels.findMany();
  }

  async getById(id: number): Promise<Levels | null> {
    return await this.prisma.levels.findUnique({
      where: { id },
    });
  }

  async create(levelData: Prisma.LevelsCreateInput): Promise<Levels> {
    return await this.prisma.levels.create({
      data: levelData,
    });
  }

  async update(id: number, levelData: Prisma.LevelsUpdateInput): Promise<Levels> {
    return await this.prisma.levels.update({
      where: { id },
      data: {
        ...levelData,
      },
    });
  }

  async delete(id: number): Promise<Levels> {
    return await this.prisma.levels.delete({
      where: { id },
    });
  }

  async checkIfLevelHasDevs(id: number): Promise<boolean> {
    const checkIfTheresDevsWithLevel = await this.prisma.developer.findFirst({
      where: { nivelId: id },
    });

    return !!checkIfTheresDevsWithLevel;

  }
}
