import * as React from 'react';

import Button from '@material-ui/core/Button';

import AddNpcCard from 'components/AddNpcCard';
import BuyInDialog from 'components/BuyInDialog';
import { CenterBox } from 'components/utils/CenterBox';
import useDialogState from 'hooks/useDialogState';

import { useEmptySeat } from './hooks/useEmptySeat';

type Props = {
  seatNo: number;
  tableId: string;
};

export const EmptySeat = React.memo(({ seatNo, tableId }: Props) => {
  const [isOpen, openDialog, closeDialog] = useDialogState();
  const { isSeated, isRoomViewer } = useEmptySeat();

  if (isRoomViewer) return null;

  return (
    <CenterBox>
      {isSeated ? (
        <AddNpcCard tableId={tableId} seatNo={seatNo} />
      ) : (
        <div>
          <Button variant="outlined" onClick={openDialog}>
            座る
          </Button>
          <BuyInDialog tableId={tableId} seatNo={seatNo} isOpen={isOpen} onClose={closeDialog} />
        </div>
      )}
    </CenterBox>
  );
});
