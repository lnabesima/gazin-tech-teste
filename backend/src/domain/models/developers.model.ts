export class Developer{
  constructor(
    id: number,
    nome: string,
    sexo: 'M' | 'F',
  dataNascimento: Date,
    idade: number,
    hobby: string,
    nivel: {
      id: number;
      nivel: string;
    }
  ) {}
}
