import { Developer } from "../models/developers.model";
import { CreateDeveloperDto } from '../../application/dtos/createDeveloper.dto';
import { DeveloperDto } from '../../application/dtos/developer.dto';
import { UpdateDeveloperDto } from '../../application/dtos/updateDeveloperDto';

export interface IDevelopersService {
  registerDeveloper(developer: CreateDeveloperDto): Promise<DeveloperDto>;
  getDevelopers(): Promise<DeveloperDto[]>;
  getDeveloperById(id: number): Promise<DeveloperDto>;
  updateDeveloper(id: number, developer: UpdateDeveloperDto): Promise<DeveloperDto>;
  deleteDeveloper(id: number): Promise<void>;

}
