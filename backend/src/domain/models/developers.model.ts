export class Developer{
  constructor(
    public id: number,
    public nivelId: number,
    public nome: string,
    public sexo: 'M' | 'F',
    public dataNascimento: Date,
    public hobby: string
  ) {}
}
