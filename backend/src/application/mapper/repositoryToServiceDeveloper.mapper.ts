import { DeveloperDto } from "../dtos/developer.dto";
import { RepositoryToServiceDeveloperDto } from '../dtos/repositoryToServiceDeveloper.dto';
import { calculateAge } from '../../shared/helpers/calculateAge';

export class RepositoryToServiceDeveloperMapper{
  static toDeveloperDto(repositoryDto: RepositoryToServiceDeveloperDto):DeveloperDto{
    const developerDto = new DeveloperDto();

    developerDto.id = repositoryDto.id;
    developerDto.nome = repositoryDto.nome;
    developerDto.sexo = repositoryDto.sexo;
    developerDto.data_nascimento = this.#formatDateToYYYYMMDD(repositoryDto.dataNascimento);
    developerDto.idade = calculateAge(repositoryDto.dataNascimento);
    developerDto.hobby = repositoryDto.hobby;
    developerDto.nivel = repositoryDto.nivel;


    return developerDto;
  }

  static #formatDateToYYYYMMDD(date: Date) : string{
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const day = String(date.getUTCDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;

  }
}
