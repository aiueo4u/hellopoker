import React from 'react';

import Box from '@material-ui/core/Box';
import LinearProgress from '@material-ui/core/LinearProgress';
import PropTypes from 'prop-types';

import { EmptySeat } from 'components/EmptySeat';
import MessageTooltip from 'components/MessageTooltip';
import PlayerMenuDialog from 'components/PlayerMenuDialog';
import { PlayerWindow } from 'components/PlayerWindow';
import useDialogState from 'hooks/useDialogState';
import useGameTableState from 'hooks/useGameTableState';
import usePlayerActionTimer from 'hooks/usePlayerActionTimer';
import usePlayerSessionState from 'hooks/usePlayerSessionState';

import useStyles from './HeroPlayerPanelStyles';
import usePlayAudioMyTurn from './hooks/usePlayAudioMyTurn';

const HeroPlayerPanel = ({ player, tableId }) => {
  const gameTable = useGameTableState();
  const { playerId } = usePlayerSessionState();
  const isTurn = player && player.seatNo === gameTable.currentSeatNo;
  const isMe = player && player.id === playerId;
  const { remainTimePercentage } = usePlayerActionTimer(player, gameTable);
  const [isOpen, openDialog, closeDialog] = useDialogState();
  const classes = useStyles({ player });

  // 自分の番が来たら音がなる
  usePlayAudioMyTurn(isTurn && isMe);

  if (!player || !player.id) {
    return (
      <div className={classes.container}>
        <EmptySeat tableId={tableId} seatNo={1} />
      </div>
    );
  }

  return (
    <>
      <div className={classes.container}>
        <Box textAlign="center">
          <MessageTooltip player={player} />
        </Box>

        {/* プレイヤーのアバターorビデオ */}
        <PlayerWindow tableId={tableId} player={player} isTurn={isTurn} />

        {/* プレイヤーの残り時間 */}
        <div className={classes.statusCard} onClick={openDialog}>
          {isTurn && remainTimePercentage > 0 && <LinearProgress variant="determinate" value={remainTimePercentage} />}
        </div>
      </div>

      <PlayerMenuDialog isOpen={isOpen} onClose={closeDialog} player={player} tableId={tableId} />
    </>
  );
};

HeroPlayerPanel.propTypes = {
  tableId: PropTypes.string.isRequired,
  player: PropTypes.object.isRequired,
};

export default HeroPlayerPanel;
