import { BadRequestException, HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { ILevelsService } from 'src/domain/interfaces/levels.interface';
import { Levels } from 'src/domain/models/levels.model';
import { ILevelsRepository } from '../../domain/repositories/levelsRepository.interface';
import {
  PrismaClientKnownRequestError,
  PrismaClientValidationError,
} from '@prisma/client/runtime/library';

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
    const level = await this.levelsRepository.getById(id);
    try {

      //TODO: find a better way to propagate errors
      if (!level) {
        throw new HttpException('No levels found', HttpStatus.NOT_FOUND);
      }
      return level;
    } catch (e) {
      if (!( e instanceof HttpException )) {

        throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
      }

      throw e;
    }
  }

  async createLevel(levelData: Prisma.LevelsCreateInput): Promise<Levels> {
    try {
      return await this.levelsRepository.create(levelData);
    } catch (e) {
      throw e;
    }
  }

  async updateLevel(id: number, levelData: Partial<Levels>): Promise<Levels | null> {
    try {
      return await this.levelsRepository.update(id, levelData);
    } catch (e) {
      throw e;
    }
  }

  async deleteLevel(id: string): Promise<void> {
    const numberId = Number(id);
    if (isNaN(numberId) || numberId <= 0) {
      throw new HttpException('Invalid level ID.', HttpStatus.BAD_REQUEST);
    }

    try {
      const levelHasDevs = await this.levelsRepository.checkIfLevelHasDevs(numberId);

      if (levelHasDevs) {
        //TODO: Create a custom exception
        throw new HttpException('Cannot delete level with associated developers.', HttpStatus.BAD_REQUEST);
      }

      await this.levelsRepository.delete(numberId);
    } catch (e) {
      //TODO: Create a utility function to extract handling
      if (e instanceof HttpException && e.getStatus() === 400) {
        throw e //this is too hacky, but will have to do for now
      }

      if (e instanceof PrismaClientKnownRequestError) {
        if (e.code === 'P2025') { //this means not found
          throw new HttpException('Level not found.', HttpStatus.NOT_FOUND);
        }
      }

      if (e instanceof PrismaClientValidationError) {
        throw new HttpException('Some parameters are either invalid or missing.',
          HttpStatus.BAD_REQUEST);
      }

      //TODO: implement a logger method here
      console.error("Unexpected error: ", e)
      throw new HttpException('Unexpected error.', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
