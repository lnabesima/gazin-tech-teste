import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
// import { AtLeastOneField } from '../../shared/validators/atLeastOneField.constraint';

export class UpdateLevelDto {
  @IsOptional()
  @IsNumber()
  id?: number;

  @IsString()
  @IsNotEmpty({message: `The 'nivel' field is required and cannot be empty.`})
  nivel: string
}
