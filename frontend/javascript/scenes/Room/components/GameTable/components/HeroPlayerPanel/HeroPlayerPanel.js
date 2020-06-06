import React from 'react';
import PropTypes from 'prop-types';

import LinearProgress from '@material-ui/core/LinearProgress';

import EmptySeat from 'components/EmptySeat';

import PlayerAvatar from 'components/PlayerAvatar';
import PlayerMenuDialog from 'components/PlayerMenuDialog';
import PokerCard from 'components/PokerCard';

import useDialogState from 'hooks/useDialogState';
import useGameTableState from 'hooks/useGameTableState';
import usePlayerActionTimer from 'hooks/usePlayerActionTimer';

import useStyles from './HeroPlayerPanelStyles';
import usePlayAudioMyTurn from './hooks/usePlayAudioMyTurn';

const HeroPlayerPanel = ({ player, tableId }) => {
  const gameTable = useGameTableState();
  const isHeroTurn = player && player.seat_no === gameTable.currentSeatNo;
  const { remainTimePercentage } = usePlayerActionTimer(player, gameTable);
  const [isOpen, openDialog, closeDialog] = useDialogState();
  const classes = useStyles({ player });

  // 自分の番が来たら音がなる
  usePlayAudioMyTurn(isHeroTurn);

  if (!player || !player.id) {
    return (
      <div className={classes.container}>
        <EmptySeat tableId={tableId} seatNo={1} />
      </div>
    );
  }

  const cards = gameTable.dealtCards[player.id];

  return (
    <>
      <div className={classes.container}>
        {/* プレイヤーのアバターorビデオ */}
        <PlayerAvatar player={player} isTurn={isHeroTurn} />

        {/* プレイヤーのスタックと残り時間 */}
        <div className={classes.statusCard} onClick={openDialog}>
          {isHeroTurn && remainTimePercentage > 0 && (
            <LinearProgress variant="determinate" value={remainTimePercentage} />
          )}
        </div>

        {/* プレイヤーのハンド */}
        {cards && cards.length === 2 && player.state !== 'folded' && (
          <>
            <div className={classes.heroHoleCard1}>
              <PokerCard rank={cards[0].rank} suit={cards[0].suit} size="medium" />
            </div>
            <div className={classes.heroHoleCard2}>
              <PokerCard rank={cards[1].rank} suit={cards[1].suit} size="medium" />
            </div>
          </>
        )}
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
