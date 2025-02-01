import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LevelsController } from './interface/levels.controller';
import { DevelopersController } from './interface/developers.controller';

@Module({
  imports: [],
  controllers: [AppController, LevelsController, DevelopersController],
  providers: [AppService],
})
export class AppModule {}
