import { Prisma, Developer } from '@prisma/client';
import { RepositoryToServiceDeveloperDto } from 'src/application/dtos/repositoryToServiceDeveloper.dto';
import { UpdateDeveloperDto } from '../../application/dtos/updateDeveloperDto';

export interface IDevelopersRepository {
  getAll(): Promise<RepositoryToServiceDeveloperDto[]>;
  getById(id: number): Promise<RepositoryToServiceDeveloperDto | null>;
  create(developer: Prisma.DeveloperUncheckedCreateInput): Promise<RepositoryToServiceDeveloperDto>;
  update(id: number, developer: UpdateDeveloperDto): Promise<RepositoryToServiceDeveloperDto>;
  delete(id: number): Promise<boolean>;
}
