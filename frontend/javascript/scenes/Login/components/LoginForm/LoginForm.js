import React from 'react';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import useFormData from 'hooks/useFormData';
import useSubmitFormData from './hooks/useSubmitFormData';
import useStyles from './LoginFormStyles';

const LoginForm = () => {
  const classes = useStyles();
  const [formData, onChangeFormData] = useFormData({ name: '' });
  const onSubmitFormData = useSubmitFormData();

  return (
    <Box className={classes.container}>
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

export default LoginForm;
