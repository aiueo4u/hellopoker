import * as React from 'react';

import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import { Dialog } from 'components/dialog/Dialog';

import { useBuyInDialog } from './hooks/useBuyInDialog';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  seatNo: number;
  tableId: string;
};

export const BuyInDialog = ({ isOpen, onClose, seatNo, tableId }: Props) => {
  const { amount, onSubmitTakeSeat, onChange } = useBuyInDialog({ tableId, seatNo });

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      title={`シートNo. ${seatNo}`}
      submitButtonLabel="着席"
      onSubmit={onSubmitTakeSeat}
    >
      <Typography>スタックを入力してください。</Typography>
      <Box mt={2}>
        <TextField label="スタック" onChange={onChange} value={amount} />
      </Box>
    </Dialog>
  );
};
