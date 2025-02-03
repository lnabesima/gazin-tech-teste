import {
  Body,
  Controller,
  Delete,
  Get, HttpCode,
  HttpException, HttpStatus,
  Inject,
  Param, ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ILevelsService } from '../domain/interfaces/levels.interface';
import { UpdateLevelDto } from '../application/dtos/updateLevel.dto';

@Controller('levels')
export class LevelsController {
  constructor(
    @Inject('ILevelsService')
    private readonly levelsService: ILevelsService) {}

  @Get()
  async getLevels() {
    return await this.levelsService.getAllLevels();
  };

  @Get(':id')
  async getLevelById(@Param('id', new ParseIntPipe()) id: number,) {
    return await this.levelsService.getLevelById(id);
  }

  @Post()
  @HttpCode(201) //to ensure that code 201 is sent instead of 200
  async createLevel(@Body() bodyRequest: UpdateLevelDto) {
    const { nivel } = bodyRequest;

    return await this.levelsService.createLevel({
      nivel,
    });
  }

  @Put(':id')
  async updateLevel(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() bodyRequest: UpdateLevelDto) {
    const { nivel } = bodyRequest;

    return await this.levelsService.updateLevel(id, {
      nivel,
    });
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteLevel(@Param('id', new ParseIntPipe()) id: number,) {
    return await this.levelsService.deleteLevel(id);
  }
}
