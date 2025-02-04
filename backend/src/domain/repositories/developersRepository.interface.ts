import { Prisma, Developer } from '@prisma/client';
import { RepositoryToServiceDeveloperDto } from 'src/application/dtos/repositoryToServiceDeveloper.dto';

export interface IDevelopersRepository {
  getAll(): Promise<RepositoryToServiceDeveloperDto[]>;
  getById(id: number): Promise<RepositoryToServiceDeveloperDto | null>;
  create(developer: Prisma.DeveloperUncheckedCreateInput): Promise<RepositoryToServiceDeveloperDto>;
  update(id: number, developer: Prisma.DeveloperUpdateInput): Promise<RepositoryToServiceDeveloperDto>;
  delete(id: number): Promise<boolean>;
}
