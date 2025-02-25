import { Levels } from '../models/levels.model';
import { Prisma } from '@prisma/client';

export interface ILevelsRepository {
  getAll(): Promise<Levels[] | null>;
  getById(id: number): Promise<Levels | null>;
  create(levelData: Prisma.LevelsCreateInput): Promise<Levels>;
  update(id: number, levelData: Partial<Levels>): Promise<Levels>;
  delete(id: number): Promise<Levels>;
  checkIfLevelHasDevs(id: number): Promise<boolean>;
}
