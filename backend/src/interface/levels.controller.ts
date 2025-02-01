import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';

@Controller('levels')
export class LevelsController {

  @Get()
  getLevels() {
    // TODO: return 404 if there's no registered level
    return [
      { id: 1, nivel: 'Nível 1' },
      { id: 2, nivel: 'Nível 2' },
      { id: 3, nivel: 'Nível 3' },
      { id: 4, nivel: 'Nível 4' },
    ];
  };

  @Get(":id")
  getLevelById(@Param("id") id: string) {
    // TODO: return 404 if there's no such id
    const foundLevel: string = `Nivel ${id}`
    return {
      nivel: foundLevel
    };
  }

  @Post()
  createLevel(@Body() nivel: string) {
    // TODO: return 400 if there's no `nivel` param or it is malformed
    // TODO: return 500 if there's some error processing the data
    return nivel;
  }

  @Put(":id")
  updateLevel(@Param("id") id: string, @Body() nivel: string) {
    // TODO: return 404 if there's no such id
    // TODO: return 400 if there's no `nivel` param or it is malformed
    // TODO: return 500 if there's some error processing the data
    // find the level by ID
    // then update it with the `nivel` param
    // finally update it on the db
    const updatedLevel:string = nivel
    return updatedLevel
  }

  @Delete(":id")
  deleteLevel(@Param("id") id: string){
    // TODO: return 404 if there's no such id
    // TODO: return 400 if there's devs with that level (can't delete what's being used)
    const deletedLevel:string = `Nivel ${id}`
    return{
      nivel: deletedLevel
    }
  }
}
