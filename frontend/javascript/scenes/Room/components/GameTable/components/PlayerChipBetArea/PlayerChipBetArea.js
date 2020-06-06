import React from 'react';
import { makeStyles } from '@material-ui/styles';

import DealerButtonPlate from 'components/DealerButtonPlate';
import useGameTableState from 'hooks/useGameTableState';
import usePlayersState from 'hooks/usePlayersState';
import usePlayerSessionState from 'hooks/usePlayerSessionState';

import styles from './PlayerChipBetAreaStyles';

const useStyles = makeStyles(styles);

const PlayerChipBetArea = () => {
  const gameTable = useGameTableState();
  const players = usePlayersState();
  const session = usePlayerSessionState();

  const player = players.find(player => player.id === session.playerId);
  const classes = useStyles({ player });

  if (!player) return null;

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
          {player.betSize
            ? `${player.betAmountInState || 0} → ${player.betAmountInState + player.betSize}`
            : player.betAmountInState > 0 && player.betAmountInState}
        </span>
      )}

      {// ディーラーボタン
      gameTable.inGame && player.seatNo === gameTable.buttonSeatNo && <DealerButtonPlate />}
    </div>
  );
};

export default PlayerChipBetArea;
