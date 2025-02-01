import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LevelsController } from './interface/levels.controller';

@Module({
  imports: [],
  controllers: [AppController, LevelsController],
  providers: [AppService],
})
export class AppModule {}
