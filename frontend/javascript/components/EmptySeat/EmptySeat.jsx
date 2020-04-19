import React from 'react';
            
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/styles';

import BuyInDialog from 'components/BuyInDialog';
import AddNpcCard from 'components/AddNpcCard'
import useDialogState from 'hooks/useDialogState';

import useEmptySeat from './hooks/useEmptySeat';
import styles from './EmptySeatStyles';

const useStyles = makeStyles(styles);

const EmptySeat = ({ seatNo, tableId }) => {
  const classes = useStyles();
  const [isOpen, openDialog, closeDialog] = useDialogState();
  const [isSeated] = useEmptySeat();

  return (
    <div className={classes.container}>
      {isSeated ? (
        <AddNpcCard tableId={tableId} seatNo={seatNo} />
      ) : (
        <>
          <Button
            className={classes.button}
            variant="contained"
            color="primary"
            onClick={openDialog}
          >
            座る
          </Button>
          <BuyInDialog tableId={tableId} seatNo={seatNo} isOpen={isOpen} onClose={closeDialog} />
        </>
      )}
    </div>
  );
};

export default EmptySeat;
