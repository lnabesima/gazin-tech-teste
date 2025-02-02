import { Levels } from '../models/levels.model';

export interface LevelsRepository {
  getAll(): Promise<Levels[]>;
  getById(id: number): Promise<Levels | null>;
  create(level: Partial<Levels>): Promise<Levels>;
  update(id: number, level: Partial<Levels>): Promise<Levels>;
  delete(id: number): Promise<void>;
}
