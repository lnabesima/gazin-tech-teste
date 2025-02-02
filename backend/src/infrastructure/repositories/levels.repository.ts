import { Injectable } from '@nestjs/common';
import { Levels } from 'src/domain/models/levels.model';
import { ILevelsRepository } from '../../domain/repositories/levelsRepository.interface';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class LevelsRepository implements ILevelsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getAll(): Promise<Levels[]> {
    return await this.prisma.levels.findMany();
  }

  async getById(id: number): Promise<Levels | null> {
    return await this.prisma.levels.findUnique({
      where: { id }
    })
  }

  async create(levelData: Prisma.LevelsCreateInput): Promise<Levels> {
    try {
      return await this.prisma.levels.create({
        data: levelData
      })
    } catch (error) {
      if(error instanceof Prisma.PrismaClientKnownRequestError){
        if (error.code === 'P2002'){
          throw new Error('A record with the given unique fields already exists.');
        }
      }
      //TODO: write specific error handlers
      throw error;
    }
  }

  async update(id: number, levelData: Prisma.LevelsUpdateInput): Promise<Levels | null> {
    const level = await this.prisma.levels.findUnique({
      where: { id }
    })

    if (!level){
      return null
    }

    return await this.prisma.levels.update({
      where: { id },
      data: {
        ...levelData,
      }
    })
  }

  async delete(id: number): Promise<number | null> {
    try {
      await this.prisma.levels.delete({
        where: { id },
      });
      return id;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError)
        if (error.code === 'P2025') {
        return null;
      }
      throw error;
    }
  }
}
