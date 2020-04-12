import React from 'react';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/styles';

import useFormData from 'hooks/useFormData';
import useSubmitFormData from './hooks/useSubmitFormData';
import styles from './LoginFormStyles';

const useStyles = makeStyles(styles);

function LoginForm() {
  const classes = useStyles();
  const [formData, onChangeFormData] = useFormData({ name: '' });
  const onSubmitFormData = useSubmitFormData();

  return (
    <Box className={classes.container}>
      <TextField name="name" label="ユーザー名" value={formData.name} onChange={onChangeFormData} />
      <Button variant="outlined" onClick={() => onSubmitFormData(formData)}>
        デバッグログイン
      </Button>
    </Box>
  );
};

export default LoginForm;
