import { DeveloperDto } from "../developer.dto";
import { DeveloperRepositoryToServiceDto } from '../developerRepositoryToService.dto';
import { calculateAge } from '../../../shared/helpers/calculateAge';

export class RepositoryToServiceDeveloperMapper{
  static toDeveloperDto(repositoryDto: DeveloperRepositoryToServiceDto):DeveloperDto{
    const developerDto = new DeveloperDto();

    developerDto.id = repositoryDto.id;
    developerDto.nome = repositoryDto.nome;
    developerDto.sexo = repositoryDto.sexo;
    developerDto.data_nascimento = repositoryDto.dataNascimento;
    developerDto.idade = calculateAge(repositoryDto.dataNascimento);
    developerDto.hobby = repositoryDto.hobby;
    developerDto.nivel = repositoryDto.nivel;


    return developerDto;
  }
}
