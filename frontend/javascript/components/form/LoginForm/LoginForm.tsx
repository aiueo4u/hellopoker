import * as React from 'react';

import { Box, Button, TextField } from '@material-ui/core';

import useFormData from 'hooks/useFormData';
import { useSubmitFormData } from './hooks/useSubmitFormData';
import { useStyles } from './LoginFormStyles';

export const LoginForm = () => {
  const classes = useStyles();
  const [formData, onChangeFormData]: any = useFormData({ name: '' });
  const onSubmitFormData = useSubmitFormData();

  return (
    <Box>
      <TextField
        className={classes.textField}
        name="name"
        variant="outlined"
        margin="dense"
        label="ゲスト名"
        value={formData.name}
        onChange={onChangeFormData}
      />
      <Box mt={1}>
        <Button variant="contained" color="primary" onClick={() => onSubmitFormData(formData)}>
          ログイン
        </Button>
      </Box>
    </Box>
  );
};
