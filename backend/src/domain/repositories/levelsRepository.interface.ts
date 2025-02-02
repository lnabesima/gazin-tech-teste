import { Levels } from '../models/levels.model';
import { Prisma } from '@prisma/client';
import { NotFoundException } from '@nestjs/common';

export interface ILevelsRepository {
  getAll(): Promise<Levels[]>;
  getById(id: number): Promise<Levels>;
  create(levelData: Prisma.LevelsCreateInput): Promise<Levels>;
  update(id: number, levelData: Partial<Levels>): Promise<Levels>;
  delete(id: number): Promise<number | NotFoundException>;
}
