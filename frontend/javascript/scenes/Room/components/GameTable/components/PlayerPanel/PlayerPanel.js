import React from 'react';
import PropTypes from 'prop-types';

import Box from '@material-ui/core/Box';
import LinearProgress from '@material-ui/core/LinearProgress';
//import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/styles';

import PlayerWindow from 'components/PlayerWindow';
import PlayerMenuDialog from 'components/PlayerMenuDialog';
import PokerChip from 'components/PokerChip';
import DealerButtonPlate from 'components/DealerButtonPlate';

import useGameTableState from 'hooks/useGameTableState';
import useDialogState from 'hooks/useDialogState';
import usePlayerActionTimer from 'hooks/usePlayerActionTimer';

import styles from './PlayerPanelStyles';

const useStyles = makeStyles(styles);

const PlayerPanel = ({ tableId, position, player }) => {
  const gameTable = useGameTableState();
  const [isOpen, openDialog, closeDialog] = useDialogState();

  const { remainTimePercentage } = usePlayerActionTimer(player, gameTable);
  const isPlayerTurn = player.seatNo === gameTable.currentSeatNo;
  const classes = useStyles({ player, position, isPlayerTurn });

  // TODO
  /*
  if (!player.id) {
    player.id = 123;
    player.nickname = 'aiueo4u-hogehoge';
    player.imageUrl = 'https://pbs.twimg.com/media/EUK26AJVAAAjUUr?format=jpg&name=240x240';
    player.stack = 12345;
    player.betAmountInState = 1234;
  }
  */

  return (
    <>
      <Box className={classes.panelContainer} onClick={openDialog}>
        <PlayerWindow player={player} isTurn={isPlayerTurn} />
        <Box>
          {isPlayerTurn && !!remainTimePercentage && (
            <LinearProgress variant="determinate" value={remainTimePercentage} />
          )}
        </Box>

        {player.seatNo === gameTable.buttonSeatNo && (
          <div className={classes.dealerButton}>
            <DealerButtonPlate />
          </div>
        )}

        {/* チップ増減結果 */}
        {gameTable.gameHandState === 'finished' && !!player.amountDiff && (
          <div className={classes.betAmount}>
            <span className={classes.result}>
              {player.amountDiff > 0 && <span>+</span>}
              {player.amountDiff}
            </span>
          </div>
        )}

        {/* ベット額 */}
        {gameTable.inGame && player.betAmountInState > 0 && (
          <div className={classes.betAmount}>
            <PokerChip amount={player.betAmountInState} />
          </div>
        )}
      </Box>
      <PlayerMenuDialog isOpen={isOpen} onClose={closeDialog} player={player} tableId={tableId} />
    </>
  );
};

PlayerPanel.propTypes = {
  tableId: PropTypes.string.isRequired,
  position: PropTypes.string,
  player: PropTypes.object.isRequired,
};

PlayerPanel.defaultProps = {
  position: null,
};

export default PlayerPanel;
