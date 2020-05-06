import React from 'react';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import BuyInDialog from 'components/BuyInDialog';
import useDialogState from 'hooks/useDialogState';

const PlayerMenuDialog = ({
  player,
  isOpen,
  onClose,
  tableId,
}) => {
  const [isOpenBuyInDialog, openBuyInDialog, closeBuyInDialog] = useDialogState();

  return (
    <>
      <Dialog open={isOpen} onClose={onClose}>
        <DialogTitle>
          {"Player " + player.nickname}
        </DialogTitle>
        <DialogContent>
          <div>Stack {player.stack}</div>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="primary" onClick={openBuyInDialog}>
            チップ量調整
          </Button>
        </DialogActions>
      </Dialog>
      <BuyInDialog tableId={tableId} seatNo={player.seat_no} isOpen={isOpenBuyInDialog} onClose={closeBuyInDialog} />
    </>
  );
};

export default PlayerMenuDialog;
