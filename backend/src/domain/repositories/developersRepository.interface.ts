import { Prisma } from '@prisma/client';
import { Developer } from '../models/developers.model';
import { NotFoundException } from '@nestjs/common';

export interface IDevelopersRepository {
  getAll(): Promise<Developer[]>;
  getById(id: number): Promise<Developer | NotFoundException>;
  register(developer: Prisma.DeveloperCreateInput): Promise<Developer>;
  update(id: number, developer: Prisma.DeveloperUpdateInput): Promise<Developer | NotFoundException>;
  edit(id: number, developer: Partial<Prisma.DeveloperUpdateInput>): Promise<Developer | NotFoundException>;
  delete(id: number): Promise<number | NotFoundException>;
}
