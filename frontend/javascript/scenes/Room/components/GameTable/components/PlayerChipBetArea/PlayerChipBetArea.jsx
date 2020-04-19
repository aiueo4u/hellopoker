import React from 'react';
import { makeStyles } from '@material-ui/styles';

import DealerButtonPlate from 'components/DealerButtonPlate';
import useGameTableState from 'hooks/useGameTableState';
import usePlayersState from 'hooks/usePlayersState';
import usePlayerSessionState from 'hooks/usePlayerSessionState';

import styles from './PlayerChipBetAreaStyles';

const useStyles = makeStyles(styles);

function PlayerChipBetArea() {
  const gameTable = useGameTableState();
  const players = usePlayersState();
  const session = usePlayerSessionState();

  const player = players.find(player => player.id === session.playerId);
  const classes = useStyles({ player });

  if (!player) return null;

  return (
    <div className={classes.container}>
      {// 結果の収支
      gameTable.gameHandState === 'finished' && player.amount_diff && (
        <div className={classes.result}>
          {player.amount_diff > 0 && <span>+</span>}
          {player.amount_diff}
        </div>
      )}

      {// ベット額
      gameTable.inGame && !!(player.bet_amount_in_state || player.betSize) && (
        <span className={classes.betArea}>
          {player.betSize
            ? `${player.bet_amount_in_state || 0} → ${player.bet_amount_in_state + player.betSize}`
            : (player.bet_amount_in_state > 0 && player.bet_amount_in_state)
          }
        </span>
      )}

      {// ディーラーボタン
      gameTable.inGame && player.seat_no === gameTable.buttonSeatNo && <DealerButtonPlate />}
    </div>
  );
};

export default PlayerChipBetArea;
