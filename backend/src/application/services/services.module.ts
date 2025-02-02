import { Module } from '@nestjs/common';
import { LevelsService } from './levels.service';
import { RepositoriesModule } from '../../infrastructure/repositories/repositories.module';

@Module({
  imports:[RepositoriesModule],
  providers: [{
    provide: 'ILevelsService',
    useClass: LevelsService
  }],
  exports:['ILevelsService']
})

export class ServicesModule {}
