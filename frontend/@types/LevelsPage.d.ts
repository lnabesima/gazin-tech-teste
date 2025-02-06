interface BaseLevelProps {
  method: 'POST' | 'PUT' | 'DELETE' | undefined;
  levelId?: number;
}

export type Level = {
  id: number; nivel: string;
}

export interface LevelParam {
  id: number,
  name: string
}

export interface mutateLevelProps extends BaseLevelProps {
  levelName?: string;
}

export type HandleSubmitProps = BaseLevelProps

export interface modalOptionsProps {
  open: boolean,
  modalOperation: 'POST' | 'PUT' | 'PATCH' | 'DELETE',
  domain: 'niveis' | 'desenvolvedores'
}
