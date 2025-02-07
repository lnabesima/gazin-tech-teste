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
  nome: string,
  sexo: 'M' | 'F',
  dataNascimento: string,
  hobby: string,
  nivelId: number,
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
  developerId?: number

}

export interface mutateDeveloperProps extends handleOperationProps {
  developer?: CreateDeveloper
}

export type selectableOperations = "POST" | "PATCH" | "DELETE"
