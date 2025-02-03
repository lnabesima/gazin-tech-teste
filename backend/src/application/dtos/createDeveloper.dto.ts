import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateDeveloperDto {
  @IsNumber()
  @IsNotEmpty({ message: `The 'nivelId' field is required and cannot be empty.` })
  nivelId: number;

  @IsString()
  @IsNotEmpty({ message: `The 'nome' field is required and cannot be empty.` })
  nome: string;

  @IsString()
  @IsNotEmpty({ message: `The 'sexo' field is required and cannot be empty.` })
  sexo: 'M' | 'F';

  @IsDate()
  @IsNotEmpty({ message: `The 'dataNascimento' field is required and cannot be empty.` })
  @Transform(({ value }) => {
    if (typeof value === 'string') {
      return new Date(value);
    }
    return value;
  })
  dataNascimento: Date;

  @IsString()
  @IsNotEmpty({ message: `The 'hobby' field is required and cannot be empty.` })
  hobby: string;
}
