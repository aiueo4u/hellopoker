import React, { useState } from 'react';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/styles';

import useFormData from 'hooks/useFormData';
import useSubmitFormData from '../../hooks/useSubmitFormData';
import styles from './CreateTableFormStyles';

const useStyles = makeStyles(styles);

const initialFormData = ({
  name: '',
  sb: 50,
  bb: 100,
});

function CreateTableForm() {
  const classes = useStyles();
  const [isSending, setIsSending] = useState(false);
  const [formData, onChangeFormData] = useFormData(initialFormData);
  const submitFormData = useSubmitFormData();

  const onSubmitFormData = () => {
    setIsSending(true);
    submitFormData(formData);
  };

  return (
    <div className={classes.container}>
      <Typography variant="h6">新しくテーブルを作成する</Typography>
      <Box mt={2}>
        <div className={classes.formGroup}>
          <TextField name="name" label="テーブル名" variant="outlined" value={formData.name} onChange={onChangeFormData} disabled={isSending} autoFocus />
        </div>
        <div className={classes.formGroup}>
          <TextField name="sb" label="SB" variant="outlined" value={formData.sb} onChange={onChangeFormData} disabled={isSending} />
        </div>
        <div className={classes.formGroup}>
          <TextField name="bb" label="BB" variant="outlined" value={formData.bb} onChange={onChangeFormData} disabled={isSending} />
        </div>
        <div className={classes.formGroup}>
          <Button disabled={isSending} variant="contained" color="primary" onClick={onSubmitFormData}>作成</Button>
        </div>
      </Box>
    </div>
  );
}

export default CreateTableForm;
