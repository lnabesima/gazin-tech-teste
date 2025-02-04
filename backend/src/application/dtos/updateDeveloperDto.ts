import { IsDate, IsInt, IsOptional, IsString } from 'class-validator';
import {
  RequiresAtLeastOneProperty,
} from '../../shared/validators/requiresAtLeastOneProperty.decorator';

@RequiresAtLeastOneProperty({
  message: 'At least one property must be provided for update.',
})
export class UpdateDeveloperDto
{
  @IsOptional()
  @IsInt()
  nivelId?: number;

  @IsOptional()
  @IsString()
  nome?: string;

  @IsOptional()
  @IsString()
  sexo?: 'M' | 'F';

  @IsOptional()
  @IsDate()
  dataNascimento?: Date;

  @IsOptional()
  @IsString()
  hobby?: string;
}
