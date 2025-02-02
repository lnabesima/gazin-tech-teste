import { Inject, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { ILevelsService } from 'src/domain/interfaces/levels.interface';
import { Levels } from 'src/domain/models/levels.model';
import { ILevelsRepository } from '../../domain/repositories/levelsRepository.interface';

@Injectable()
export class LevelsService implements ILevelsService {
    constructor(
      @Inject('ILevelsRepository')
      private readonly levelsRepository: ILevelsRepository
    ) {}
    getAllLevels(): Promise<Levels[]> {
        return this.levelsRepository.getAll()
    }
    getLevelById(id: number): Promise<Levels | null> {
        throw new Error('Method not implemented.');
    }
    createLevel(levelData: Prisma.LevelsCreateInput): Promise<Levels> {
        throw new Error('Method not implemented.');
    }
    updateLevel(id: number, levelData: Partial<Levels>): Promise<Levels | null> {
        throw new Error('Method not implemented.');
    }
    deleteLevel(id: number): Promise<number | null> {
        throw new Error('Method not implemented.');
    }
}
