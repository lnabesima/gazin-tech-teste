import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Inject,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { IDevelopersService } from '../domain/interfaces/developers.interface';
import { CreateDeveloperDto } from '../application/dtos/createDeveloper.dto';
import { DeveloperDto } from '../application/dtos/developer.dto';

@Controller('developers')
export class DevelopersController  {
  constructor(
    @Inject('IDevelopersService')
    private readonly developersService: IDevelopersService,
  ) {}
  @Post()
  @HttpCode(201)
  async registerDeveloper(@Body() bodyRequest: CreateDeveloperDto) : Promise<DeveloperDto> {
    return await this.developersService.registerDeveloper(bodyRequest)
  }

  @Get()
  async getDevelopers() {
    return await this.developersService.getDevelopers()
  }

  @Get(':id')
  async getDeveloperById(
    @Param('id', new ParseIntPipe()) id: number
  ) {
    return await this.developersService.getDeveloperById(id);
  }

  @Patch(':id')
  editDeveloper() {}

  @Put(':id')
  updateDeveloper() {}

  @Delete(':id')
  deleteDeveloper() {}
}
