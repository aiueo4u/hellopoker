import React from 'react';
import { useDispatch } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

import PokerChip from 'components/PokerChip';
import useGameTableState from 'hooks/useGameTableState';
import usePlayerSessionState from 'hooks/usePlayerSessionState';
import usePlayersState from 'hooks/usePlayersState';

import GameStartCountdown from '../GameStartCountdown';

import useStyles from './CentralCardStyles';
import useCentralCard from './hooks/useCentralCard';

const CentralCard = () => {
  const classes = useStyles();
  const session = usePlayerSessionState();
  const gameTable = useGameTableState();
  const players = usePlayersState();
  const dispatch = useDispatch();
  const match = useRouteMatch();
  const { onClickStartTournament } = useCentralCard();

  const tableId = match.params.id;
  const isSeated = players.some(player => player.id === session.playerId);

  const onGameStart = () => {
    dispatch({ type: 'GAME_START_BUTTON_CLICKED', tableId });
  };

  if (players.length === 1) {
    return (
      <div className={classes.container}>
        <div className={classes.message}>他のプレイヤーの参加を待っています...</div>
      </div>
    );
  }

  return (
    <div className={classes.container}>
      <Box textAlign="center" className={classes.inner}>
        {gameTable.isOpenGameStartCountdown && isSeated && (
          <Box mt={2}>
            <GameStartCountdown count={gameTable.timeToStart} />
          </Box>
        )}
        {gameTable.inGame && gameTable.pot > 0 && (
          <div className={classes.pot}>
            <PokerChip amount={gameTable.pot} />
          </div>
        )}

        <div className={classes.information}>
          {gameTable.table.name}
          <div className={classes.blindInformation}>
            {gameTable.tournament ? (
              <span>
                レベル {gameTable.tournament.currentBlindStructure.level}
                {'  '}
                {gameTable.tournament.currentBlindStructure.sb}/{gameTable.tournament.currentBlindStructure.bb}
              </span>
            ) : (
              <span>
                レベル {gameTable.table.sbSize}/{gameTable.table.bbSize}
              </span>
            )}
          </div>
        </div>

        {!gameTable.inGame && isSeated && (
          <Box className={classes.buttonContainer}>
            <Button variant="contained" color="primary" onClick={onGameStart}>
              開始
            </Button>
          </Box>
        )}

        {/* TODO: condition */}
        {gameTable.tournament && !gameTable.tournament.isStarted && isSeated && (
          <Box className={classes.buttonContainer}>
            <Button variant="contained" color="primary" onClick={onClickStartTournament}>
              トーナメント開始！
            </Button>
          </Box>
        )}
      </Box>
    </div>
  );
};

export default CentralCard;
