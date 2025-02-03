import { Developer } from "../models/developers.model";
import { CreateDeveloperDto } from '../../application/dtos/createDeveloper.dto';

export interface IDevelopersService {
  registerDeveloper(developer: CreateDeveloperDto): Promise<Developer>;
  getDevelopers(): Promise<Developer[]>;
  getDeveloperById(id: number): Promise<Developer>;
  editDeveloper(id: number, developer: Developer): Promise<Developer>;
  updateDeveloper(id: number, developer: Developer): Promise<Developer>;
  deleteDeveloper(id: number): Promise<void>;

}
