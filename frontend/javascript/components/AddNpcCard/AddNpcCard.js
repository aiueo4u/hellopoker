import React from 'react';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import PersonAddIcon from '@material-ui/icons/PersonAddOutlined';
import { makeStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import useDialogState from 'hooks/useDialogState';

import styles from './AddNpcCardStyles';

const useStyles = makeStyles(styles);

const AddNpcCard = ({ tableId, seatNo }) => {
  const classes = useStyles();
  const [isOpen, openDialog, closeDialog] = useDialogState();

  const dispatch = useDispatch();
  const addNpcPlayer = () => {
    dispatch({ type: 'ADD_NPC_PLAYER', tableId, seatNo });
  };

  return (
    <>
      <IconButton className={classes.button} onClick={openDialog}>
        <PersonAddIcon className={classes.icon} fontSize="small" />
      </IconButton>

      <Dialog open={isOpen} onClose={closeDialog}>
        <DialogTitle>追加確認</DialogTitle>
        <DialogActions>
          <Button onClick={closeDialog}>閉じる</Button>
          <Button onClick={addNpcPlayer} variant="contained" color="primary">
            NPC追加
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

AddNpcCard.propTypes = {
  seatNo: PropTypes.number.isRequired,
  tableId: PropTypes.string.isRequired,
};

export default AddNpcCard;
