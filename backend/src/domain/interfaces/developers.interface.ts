import { Developer } from "../models/developers.model";
import { CreateDeveloperDto } from '../../application/dtos/createDeveloper.dto';
import { DeveloperDto } from '../../application/dtos/developer.dto';

export interface IDevelopersService {
  registerDeveloper(developer: CreateDeveloperDto): Promise<DeveloperDto>;
  getDevelopers(): Promise<Developer[]>;
  getDeveloperById(id: number): Promise<DeveloperDto>;
  editDeveloper(id: number, developer: Developer): Promise<Developer>;
  updateDeveloper(id: number, developer: Developer): Promise<Developer>;
  deleteDeveloper(id: number): Promise<void>;

}
