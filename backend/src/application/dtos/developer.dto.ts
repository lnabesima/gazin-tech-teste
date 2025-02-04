import { RepositoryToServiceDeveloperDto } from './repositoryToServiceDeveloper.dto';

export class DeveloperDto extends RepositoryToServiceDeveloperDto{
  data_nascimento: string;
  idade: number;

  declare dataNascimento: never;
}
