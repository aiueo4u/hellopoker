import React from 'react';
import PropTypes from 'prop-types';

//import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
//import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import BuyInDialog from 'components/BuyInDialog';
import useDialogState from 'hooks/useDialogState';

const PlayerMenuDialog = ({ player, isOpen, onClose, tableId }) => {
  const [isOpenBuyInDialog, openBuyInDialog, closeBuyInDialog] = useDialogState(); // eslint-disable-line

  return (
    <>
      <Dialog open={isOpen} onClose={onClose}>
        <DialogTitle>{'プレイヤー: ' + player.nickname}</DialogTitle>
        <DialogContent>
          <div>Stack {player.stack}</div>
        </DialogContent>
        {/*
        <DialogActions>
          <Button variant="contained" color="primary" onClick={openBuyInDialog}>
            チップ量調整
          </Button>
        </DialogActions>
          */}
      </Dialog>
      <BuyInDialog tableId={tableId} seatNo={player.seatNo} isOpen={isOpenBuyInDialog} onClose={closeBuyInDialog} />
    </>
  );
};

PlayerMenuDialog.propTypes = {
  player: PropTypes.object.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  tableId: PropTypes.string.isRequired,
};

export default PlayerMenuDialog;
