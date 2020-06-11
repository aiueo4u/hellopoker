import { useEffect, useState } from 'react';

const usePlayerActionTimer = (player, gameTable) => {
  const [remainTime, setRemainTime] = useState(0);

  const maxTimeToAction = (player && player.maxRemainTimeToAction) || null;
  const isPlayerTurn = player && player.seatNo === gameTable.currentSeatNo;

  useEffect(() => {
    if (!isPlayerTurn) return;
    if (!gameTable.inGame) return;

    setRemainTime(player.remainTimeToAction);

    const timer = setInterval(() => {
      setRemainTime(time => time - 1);
    }, 1000);

    return () => {
      setRemainTime(0);
      clearInterval(timer);
    };
  }, [isPlayerTurn, gameTable.inGame, gameTable.round]);

  const remainTimePercentage = maxTimeToAction ? (remainTime / maxTimeToAction) * 100 : null;

  return { remainTimePercentage };
};

export default usePlayerActionTimer;
