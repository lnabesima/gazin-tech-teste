import { DeveloperRepositoryToServiceDto } from './developerRepositoryToService.dto';

export class DeveloperDto extends DeveloperRepositoryToServiceDto{
  data_nascimento: string;
  idade: number;

  declare dataNascimento: never;
}
