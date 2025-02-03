import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { LevelsRepository } from './levels.repository';
import { DevelopersRepository } from './developers.repository';


@Module({
  providers: [PrismaService, {
    provide: 'ILevelsRepository',
    useClass: LevelsRepository
  }, {
    provide: 'IDevelopersRepository',
    useClass: DevelopersRepository
  }],
  exports: ['ILevelsRepository', 'IDevelopersRepository']
})

export class RepositoriesModule {}
