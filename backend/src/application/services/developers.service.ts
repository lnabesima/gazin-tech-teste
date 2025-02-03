import { Developer } from '@prisma/client';
import { IDevelopersService } from '../../domain/interfaces/developers.interface';
import { CreateDeveloperDto } from '../dtos/createDeveloper.dto';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { handleError } from '../../shared/handleError';
import { IDevelopersRepository } from '../../domain/repositories/developersRepository.interface';
import { DeveloperDto } from '../dtos/developer.dto';
import {
  RepositoryToServiceDeveloperMapper,
} from '../dtos/mapper/repositoryToServiceDeveloper.mapper';
import { DeveloperRepositoryToServiceDto } from '../dtos/developerRepositoryToService.dto';

@Injectable()
export class DevelopersService implements IDevelopersService {
  constructor(
    @Inject('IDevelopersRepository')
    private readonly developersRepository: IDevelopersRepository,
  ) { }

  async registerDeveloper(developerData: CreateDeveloperDto): Promise<DeveloperDto> {
    try {
      const registeredDev = await this.developersRepository.create(developerData);

      return RepositoryToServiceDeveloperMapper.toDeveloperDto(
        registeredDev);
    } catch (e) {
      handleError(e, 'developer');
    }
  }

  getDevelopers(): Promise<Developer[]> {
    try {
      return this.developersRepository.getAll();
    } catch (error) {
      handleError(error, 'developer');
    }
  }

  async getDeveloperById(id: number): Promise<DeveloperDto> {
    try {
      const developer = await this.developersRepository.getById(id);

      if (developer === null) {
        throw new NotFoundException("There was no entries with that id.")
      }

        return RepositoryToServiceDeveloperMapper.toDeveloperDto(developer);

    } catch(error){
      handleError(error, 'developer');
    }
  }

  editDeveloper(id: number, developer: Developer): Promise<Developer> {
    throw new Error('Method not implemented.');
  }

  updateDeveloper(id: number, developer: Developer): Promise<Developer> {
    throw new Error('Method not implemented.');
  }

  deleteDeveloper(id: number): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
