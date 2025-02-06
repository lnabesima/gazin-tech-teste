export interface IncomingDeveloper {
  id: number,
  nome: string,
  sexo: 'M' | 'F',
  data_nascimento: string,
  idade: number
  hobby: string,
  nivel: {
    id: number,
    nivel: string
  }
}

export interface CreateDeveloper{
  name: string,
  sex: 'M' | 'F',
  dateOfBirth: string,
  hobby: string,
  levelId: number,
}

export interface RenderDeveloper {
  id: number,
  name: string,
  sex: 'M' | 'F',
  age: number
  level: string,
  hobby: string
}

export interface handleOperationProps{
  selectedOperation: selectableOperations
  developer: CreateDeveloper
}

export interface mutateDeveloperProps extends handleOperationProps {
  developerId: number
}

export type selectableOperations = "POST" | "PATCH" | "DELETE"
