import { Controller, Delete, Get, Patch, Post, Put } from '@nestjs/common';

@Controller('developers')
export class DevelopersController {

  @Get()
  getDevelopers(){}

  @Get(':id')
  getDeveloperById(){}

  @Post()
  registerDeveloper(){}

  @Patch(':id')
  updateDeveloper(){}

  @Put(':id')
  editDeveloper(){}

  @Delete(':id')
  deleteDeveloper(){}
}
