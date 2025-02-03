import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { ILevelsService } from 'src/domain/interfaces/levels.interface';
import { Levels } from 'src/domain/models/levels.model';
import { ILevelsRepository } from '../../domain/repositories/levelsRepository.interface';
import { handleError } from '../../shared/handleError';

@Injectable()
export class LevelsService implements ILevelsService {
  constructor(
    @Inject('ILevelsRepository')
    private readonly levelsRepository: ILevelsRepository,
  ) {}

  async getAllLevels(): Promise<Levels[]> {
    try {
      const levels = await this.levelsRepository.getAll();

      //TODO: find a better way to propagate errors
      if (!levels || levels.length === 0) {
        throw new HttpException('No levels found', HttpStatus.NOT_FOUND);
      }
      return levels;
    } catch (e) {
      if (!( e instanceof HttpException )) {

        throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
      }

      throw e;
    }
  }

  async getLevelById(id: number): Promise<Levels | null> {
    try {
      const level = await this.levelsRepository.getById(id);

      //TODO: find a better way to propagate errors
      if (!level) {
        throw new HttpException('No levels found', HttpStatus.NOT_FOUND);
      }
      return level;
    } catch (e) {
handleError(e,  'level')
    }
  }

  async createLevel(levelData: Prisma.LevelsCreateInput): Promise<Levels> {
    try {
      return await this.levelsRepository.create(levelData);
    } catch (e) {
      handleError(e,  'level')
    }
  }

  async updateLevel(id: number, levelData: Prisma.LevelsUpdateInput): Promise<Levels | null> {
    try {
      return await this.levelsRepository.update(id, levelData);
    } catch (e) {
      handleError(
        e,
        'level');
    }
  }

  async deleteLevel(id: number): Promise<void> {
    try {
      const levelHasDevs = await this.levelsRepository.checkIfLevelHasDevs(id);

      if (levelHasDevs) {
        //TODO: Create a custom exception
        throw new HttpException('Cannot delete level with associated developers.',
          HttpStatus.BAD_REQUEST);
      }

      await this.levelsRepository.delete(id);
    } catch (e) {
      handleError(e, 'level');
    }
  }
}
