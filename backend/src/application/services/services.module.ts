import { Module } from '@nestjs/common';
import { LevelsService } from './levels.service';
import { RepositoriesModule } from '../../infrastructure/repositories/repositories.module';
import { DevelopersService } from './developers.service';

@Module({
  imports:[RepositoriesModule],
  providers: [{
    provide: 'ILevelsService',
    useClass: LevelsService
  }, {
    provide: 'IDevelopersService',
    useClass: DevelopersService
  }],
  exports:['ILevelsService', 'IDevelopersService']
})

export class ServicesModule {}
