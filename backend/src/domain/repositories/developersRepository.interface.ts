import { Prisma, Developer } from '@prisma/client';
import { DeveloperRepositoryToServiceDto } from 'src/application/dtos/developerRepositoryToService.dto';

export interface IDevelopersRepository {
  getAll(): Promise<Developer[]>;
  getById(id: number): Promise<DeveloperRepositoryToServiceDto | null>;
  create(developer: Prisma.DeveloperUncheckedCreateInput): Promise<DeveloperRepositoryToServiceDto>;
  update(id: number, developer: Prisma.DeveloperUpdateInput): Promise<Developer>;
  delete(id: number): Promise<boolean>;
}
