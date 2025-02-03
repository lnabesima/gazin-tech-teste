export class RepositoryToServiceDeveloperDto {
  id: number;
  nome: string;
  sexo: 'M' | 'F';
  dataNascimento: Date;
  hobby: string;
  nivel: DeveloperLevelDto;
}

export class DeveloperLevelDto{
  id: number;
  nivel: string;
}
