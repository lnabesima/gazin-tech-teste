'use client';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  MenuItem,
  TextField,
} from '@mui/material';
import { ModalProps, ModalValuesProps } from '../../../@types/Modal';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Grid from '@mui/material/Grid2';
import dayjs from 'dayjs';

import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { Level } from '../../../@types/LevelsPage';

export const OperationsModal = (props: ModalProps) => {
  const [levels, setLevels] = useState<Level[]>([])

  //TODO: move this logic to a dedicated file
  const fetchLevels = async () => {
    const response = await fetch(`http://localhost:5001/api/v1/niveis`);

    if (!response.ok) {
      throw new Error('Failed to fetch levels');
    }

    return response.json();
  };

  const { data, isFetched } = useQuery({
    queryKey: ['levels'], queryFn: fetchLevels

  });

  useEffect(() => {
    if (isFetched){
      setLevels(Array.isArray(data) ? data : [])
    }
  }, [data, isFetched]);




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
    <Dialog open={props.openModal} fullWidth sx={{ maxWidth: 'lg', whiteSpace: 'pre-line' }} slotProps={{
      paper: {
        component: 'form',
        onSubmit: props.onSubmit,
      },
    }}>
      <DialogTitle>{modalValues.title[props.action]}</DialogTitle>
      <DialogContent dividers>
        <DialogContentText sx={{ mb: 2 }}>
          {modalValues.content[props.action]}
        </DialogContentText>
        {
          props.action !== 'DELETE' ?
            props.type === 'levels' ?
              <TextField id="levelName" name={'levelName'} label="Nome do nível"
                         value={props.levelName}
                         onChange={props.handleChangeLevelName} disabled={props.isPending}
                         variant="outlined" size={'small'}
                         error={!!props.error} helperText={props.error} fullWidth />
              :
              ( <>
                <Grid container spacing={2}>
                  <Grid size={12}>
                    <TextField label={'Nome'} fullWidth  id={"nome"} name={"nome"} value={props.developer?.nome || ''} onChange={props.handleChangeDeveloper}/>
                  </Grid>
                  <Grid size={4}>

                    {/*TODO: Check the warning on the browser's console*/}
                    <TextField select fullWidth value={props.developer?.sexo} id={"sexo"} name={"sexo"} onChange={props.handleChangeDeveloper} label={'Sexo'}>
                      <MenuItem value={'M'}>Masculino</MenuItem>
                      <MenuItem value={'F'}>Feminino</MenuItem>
                    </TextField>
                  </Grid>
                  <Grid size={4}>
                    <DatePicker value={props.developer?.dataNascimento ? dayjs(props.developer?.dataNascimento) : null} onChange={props.handleDateChange} />
                  </Grid>
                  <Grid size={4}>
                    <TextField label={'Nível'} id={"nivelId"} name={"nivelId"} value={props.developer?.nivelId} onChange={props.handleChangeDeveloper} select fullWidth>


                      {levels.map((level) => (
                        <MenuItem key={level.id} value={level.id}>
                          {level.nivel}
                        </MenuItem>
                      ))}

                    </TextField>
                  </Grid>
                  <Grid size={12}>
                    <TextField label={'Hobby'} id={"hobby"} name={"hobby"} value={props.developer?.hobby} onChange={props.handleChangeDeveloper} fullWidth />
                  </Grid>
                </Grid>

              </> )
            : null

        }
      </DialogContent>
      <DialogActions>
        <Button type="button" variant="contained" color="info"
                onClick={props.onClose}>Cancelar</Button>
        <Button type="submit" variant="contained"
                color={`${props.action !== 'DELETE' ? 'success' : 'error'}`}
                loading={props.isPending}>Confirmar</Button>
      </DialogActions>
    </Dialog>
  );
};
