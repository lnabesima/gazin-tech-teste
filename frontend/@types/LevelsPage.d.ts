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

