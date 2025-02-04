import { Levels } from '../models/levels.model';
import { Prisma } from '@prisma/client';

export interface ILevelsService {
  getAllLevels(): Promise<Levels[]>;
  getLevelById(id: number): Promise<Levels | null>;
  createLevel(levelData: Prisma.LevelsCreateInput): Promise<Levels>;
  updateLevel(id: number, levelData: Prisma.LevelsUpdateInput): Promise<Levels | null>;
  deleteLevel(id: number): Promise<void>;
}
