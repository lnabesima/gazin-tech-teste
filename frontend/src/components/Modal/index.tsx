import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle, TextField,
} from '@mui/material';
import { ModalProps, ModalValuesProps } from '../../../@types/Modal';

export const OperationsModal = (props: ModalProps) => {
  const modalValues: ModalValuesProps = {
    title: {
      POST: `Crie um novo ${props.type === 'levels' ? 'nível' : 'desenvolvedor'}`,
      PUT: `Edite um ${props.type === 'levels' ? 'nível' : 'desenvolvedor'} existente`,
      PATCH: `Edite um ${props.type === 'levels' ? 'nível' : 'desenvolvedor'} existente`,
      DELETE: `Exclua um ${props.type === 'levels' ? 'nível' : 'desenvolvedor'} existente`,
    },
    content: {
      POST: `Preencha ${props.type === 'levels' ? 'o campo' : 'os campos'} abaixo para criar um novo ${props.type === 'levels' ? 'nível' : 'desenvolvedor'}.`,
      PUT: `Preencha ${props.type === 'levels' ? 'o campo' : 'os campos'} abaixo para editar ${props.type === 'levels' ? 'nível' : 'desenvolvedor'} existente.`,
      PATCH: `Preencha ${props.type === 'levels' ? 'o campo' : 'os campos'} abaixo para editar um ${props.type === 'levels' ? 'nível' : 'desenvolvedor'} existente.`,
      DELETE: `Clique no botão CONFIRMAR para excluir o ${props.type === 'levels' ? 'nível' : 'desenvolvedor'} selecionado.\n⚠️Esta ação é irreversível!⚠️`,
    },

  };

  return (
    <Dialog open={props.openModal} fullWidth sx={{ maxWidth: 'lg', whiteSpace: 'pre-line' }} slotProps={{ paper: {
        component: 'form',
        onSubmit: props.onSubmit
      }}}>
      <DialogTitle>{modalValues.title[props.action]}</DialogTitle>
      <DialogContent dividers>
        <DialogContentText sx={{ mb:2 }}>
          {modalValues.content[props.action]}
        </DialogContentText>
        {
          props.action !== 'DELETE' ?
            props.type === 'levels' ?
              <TextField id="levelName" name={'levelName'} label="Nome do nível" value={props.levelName}
                       onChange={props.handleChangeLevelName} disabled={props.isPending} variant="outlined" size={'small'}
                       error={!!props.error} helperText={props.error} fullWidth />
              :null
            : null

        }
      </DialogContent>
      <DialogActions>
        <Button type="button" variant="contained" color="info" onClick={props.onClose}>Cancelar</Button>
        <Button type="submit" variant="contained" color={`${props.action !== 'DELETE' ? "success" : "error"}`} loading={props.isPending}>Confirmar</Button>
      </DialogActions>
    </Dialog>
  );
};
