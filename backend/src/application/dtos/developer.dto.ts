import { DeveloperRepositoryToServiceDto } from './developerRepositoryToService.dto';

export class DeveloperDto extends DeveloperRepositoryToServiceDto{
  data_nascimento: Date;
  idade: number;

  declare dataNascimento: never;
}
