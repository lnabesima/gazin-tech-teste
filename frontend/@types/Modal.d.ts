export interface ModalProps {
  openModal: boolean;
  action: 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  type: 'levels' | 'developers';
  levelName?: string;
  handleChangeLevelName?: (e: ChangeEvent<HTMLInputElement>) => void;
  isPending?: boolean;
  error?: string | null
  onSubmit: (e: FormEvent) => void
  onClose: () => void;
}

export interface ModalValuesProps {
  title: {
    POST: string,
    PUT: string,
    PATCH: string,
    DELETE: string
  },
  content: {
    POST: string,
    PUT: string,
    PATCH: string,
    DELETE: string
  }

}
