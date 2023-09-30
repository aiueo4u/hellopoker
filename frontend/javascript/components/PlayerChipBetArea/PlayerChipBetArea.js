import React from 'react';

import { makeStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';

import { DealerButtonPlate } from 'components/DealerButtonPlate';
import PokerChip from 'components/PokerChip';
import useGameTableState from 'hooks/useGameTableState';
import usePlayerSessionState from 'hooks/usePlayerSessionState';

import styles from './PlayerChipBetAreaStyles';

const useStyles = makeStyles(styles);

const PlayerChipBetArea = ({ player }) => {
  const gameTable = useGameTableState();
  const session = usePlayerSessionState();
  const classes = useStyles({ player });

  if (!player) return null;

  const isMe = player.id === session.playerId;

  return (
    <div className={classes.container}>
      {// 結果の収支
      gameTable.gameHandState === 'finished' && player.amountDiff && (
        <div className={classes.result}>
          {player.amountDiff > 0 && <span>+</span>}
          {player.amountDiff}
        </div>
      )}

      {// ベット額
      gameTable.inGame && !!(player.betAmountInState || player.betSize) && (
        <span className={classes.betArea}>
          {player.betSize && isMe
            ? `${player.betAmountInState || 0} → ${player.betAmountInState + player.betSize}`
            : player.betAmountInState > 0 && <PokerChip amount={player.betAmountInState} />}
        </span>
      )}

      {// ディーラーボタン
      gameTable.inGame && player.seatNo === gameTable.buttonSeatNo && <DealerButtonPlate />}
    </div>
  );
};

PlayerChipBetArea.propTypes = {
  player: PropTypes.object,
};

PlayerChipBetArea.defaultProps = {
  player: null,
};

export default PlayerChipBetArea;
