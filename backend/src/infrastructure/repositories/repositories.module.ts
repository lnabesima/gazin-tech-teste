import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { LevelsRepository } from './levels.repository';

@Module({
  providers: [PrismaService],
  exports: [LevelsRepository]
})

export class RepositoriesModule {}
