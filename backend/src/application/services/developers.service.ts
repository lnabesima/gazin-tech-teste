import { IDevelopersService } from '../../domain/interfaces/developers.interface';
import { CreateDeveloperDto } from '../dtos/createDeveloper.dto';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { handleError } from '../../shared/handleError';
import { IDevelopersRepository } from '../../domain/repositories/developersRepository.interface';
import { DeveloperDto } from '../dtos/developer.dto';
import { RepositoryToServiceDeveloperMapper } from '../mapper/repositoryToServiceDeveloper.mapper';
import { UpdateDeveloperDto } from '../dtos/updateDeveloperDto';

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

  async getDevelopers(): Promise<DeveloperDto[]> {
    try {
      const developerArray = await this.developersRepository.getAll();

      return developerArray.map(dev => RepositoryToServiceDeveloperMapper.toDeveloperDto(dev));
    } catch (error) {
      handleError(error, 'developer');
    }
  }

  async getDeveloperById(id: number): Promise<DeveloperDto> {
    try {
      const developer = await this.developersRepository.getById(id);

      if (developer === null) {
        throw new NotFoundException('There was no entries with that id.');
      }

      return RepositoryToServiceDeveloperMapper.toDeveloperDto(developer);

    } catch (error) {
      handleError(error, 'developer');
    }
  }

  async updateDeveloper(id: number, developer: UpdateDeveloperDto): Promise<DeveloperDto> {
    try {
      const editedDeveloper = await this.developersRepository.update(id, developer);

      return RepositoryToServiceDeveloperMapper.toDeveloperDto(editedDeveloper);
    } catch (e) {
      handleError(e, 'developer');
    }

  }

  async deleteDeveloper(id: number): Promise<void> {
    try {
      const success = await this.developersRepository.delete(id);

      if (!success) {
        throw new NotFoundException('There was no entries with that id.');
      }

    } catch (e) {
      handleError(e, 'developer');
    }
  }
}
