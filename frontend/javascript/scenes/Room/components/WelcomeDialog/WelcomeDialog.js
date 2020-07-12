import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import PeopleIcon from '@material-ui/icons/People';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';

import Loading from 'components/Loading';
import useStyles from './WelcomeDialogStyles';

const WelcomeDialog = ({ isOpen, enterRoomAsPlayer, enterRoomAsViewer }) => {
  const classes = useStyles();
  const { isPeerOpen } = useSelector(state => state.data.video);

  return (
    <Dialog open={isOpen}>
      <DialogTitle>参加方法を選んでください</DialogTitle>
      <DialogContent>
        {isPeerOpen ? (
          <Box>
            <Box>
              <Button
                onClick={enterRoomAsPlayer}
                startIcon={<PlayArrowIcon />}
                variant="contained"
                color="primary"
                fullWidth
              >
                プレイする
              </Button>
            </Box>
            <Box mt={2}>
              <Button onClick={enterRoomAsViewer} startIcon={<PeopleIcon />} variant="outlined" fullWidth>
                観戦する
              </Button>
              <Typography className={classes.caption}>※ 参加プレイヤーのハンドを見ることができます。</Typography>
            </Box>
          </Box>
        ) : (
          <Loading />
        )}
      </DialogContent>
    </Dialog>
  );
};

WelcomeDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  enterRoomAsPlayer: PropTypes.func.isRequired,
  enterRoomAsViewer: PropTypes.func.isRequired,
};

export default WelcomeDialog;
