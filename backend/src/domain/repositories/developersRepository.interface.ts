import { Prisma, Developer } from '@prisma/client';

export interface IDevelopersRepository {
  getAll(): Promise<Developer[]>;
  getById(id: number): Promise<Developer | null>;
  create(developer: Prisma.DeveloperCreateInput): Promise<Developer>;
  update(id: number, developer: Prisma.DeveloperUpdateInput): Promise<Developer>;
  delete(id: number): Promise<boolean>;
}
