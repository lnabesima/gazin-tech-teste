import { Developer } from '../models/developers.model';

export interface IDevelopersRepository {
  getAll(): Promise<Developer[]>;
  getById(id: number): Promise<Developer | null>;
  register(developer: Partial<Developer>): Promise<Developer>;
  update(id: number, developer: Partial<Developer>): Promise<Developer>;
  edit(id: number, developer: Partial<Developer>): Promise<Developer>;
  delete(id: number): Promise<void>;
}
