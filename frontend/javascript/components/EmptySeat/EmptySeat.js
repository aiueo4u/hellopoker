import React from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/styles';

import BuyInDialog from 'components/BuyInDialog';
import AddNpcCard from 'components/AddNpcCard';
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
          <Button className={classes.button} variant="outlined" onClick={openDialog}>
            座る
          </Button>
          <BuyInDialog tableId={tableId} seatNo={seatNo} isOpen={isOpen} onClose={closeDialog} />
        </>
      )}
    </div>
  );
};

EmptySeat.propTypes = {
  seatNo: PropTypes.number.isRequired,
  tableId: PropTypes.string.isRequired,
};

export default EmptySeat;
