import * as React from 'react';

import { Box, Button, TextField } from '@material-ui/core';

import useFormData from 'hooks/useFormData';

import { useSubmitFormData } from './hooks/useSubmitFormData';

const initialFormData = {
  name: '',
  sb: 50,
  bb: 100,
};

export const CreateTableForm = () => {
  const [isSending, setIsSending] = React.useState(false);
  const [formData, onChangeFormData]: any = useFormData(initialFormData);
  const submitFormData = useSubmitFormData();

  const onSubmitFormData = () => {
    setIsSending(true);
    submitFormData(formData);
  };

  return (
    <Box>
      <Box>
        <TextField
          name="name"
          label="テーブル名"
          variant="outlined"
          value={formData.name}
          onChange={onChangeFormData}
          disabled={isSending}
          autoFocus
        />
      </Box>
      <Box mt={2}>
        <TextField
          name="sb"
          label="SB"
          variant="outlined"
          value={formData.sb}
          onChange={onChangeFormData}
          disabled={isSending}
        />
      </Box>
      <Box mt={2}>
        <TextField
          name="bb"
          label="BB"
          variant="outlined"
          value={formData.bb}
          onChange={onChangeFormData}
          disabled={isSending}
        />
      </Box>
      <Box mt={2}>
        <Button disabled={isSending} variant="contained" color="primary" onClick={onSubmitFormData}>
          作成
        </Button>
      </Box>
    </Box>
  );
};
