import * as React from 'react';

import IconButton from '@material-ui/core/IconButton';
import PersonAddIcon from '@material-ui/icons/PersonAddOutlined';

import { Dialog } from 'components/dialog/Dialog';

import { useAddNpcCard } from './hooks/useAddNpcCard';

type Props = {
  tableId: string;
  seatNo: number;
};

export const AddNpcCard = ({ tableId, seatNo }: Props) => {
  const { isOpen, openDialog, closeDialog, addNpcPlayer } = useAddNpcCard({ tableId, seatNo });

  return (
    <>
      <IconButton onClick={openDialog}>
        <PersonAddIcon fontSize="small" />
      </IconButton>

      <Dialog
        isOpen={isOpen}
        onClose={closeDialog}
        title="追加確認"
        onSubmit={addNpcPlayer}
        submitButtonLabel="NPC追加"
      />
    </>
  );
};
