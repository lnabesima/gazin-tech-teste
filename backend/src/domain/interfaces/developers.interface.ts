import { Developer } from "../models/developers.model";
import { CreateDeveloperDto } from '../../application/dtos/createDeveloper.dto';
import { DeveloperDto } from '../../application/dtos/developer.dto';
import { EditDeveloperDto } from '../../application/dtos/editDeveloper.dto';

export interface IDevelopersService {
  registerDeveloper(developer: CreateDeveloperDto): Promise<DeveloperDto>;
  getDevelopers(): Promise<DeveloperDto[]>;
  getDeveloperById(id: number): Promise<DeveloperDto>;
  editDeveloper(id: number, developer: EditDeveloperDto): Promise<DeveloperDto>;
  updateDeveloper(id: number, developer: CreateDeveloperDto): Promise<DeveloperDto>;
  deleteDeveloper(id: number): Promise<void>;

}
