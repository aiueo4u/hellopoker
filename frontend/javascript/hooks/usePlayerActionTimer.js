import { useEffect, useState } from 'react';

const usePlayerActionTimer = (player, gameTable) => {
  const [remainTime, setRemainTime] = useState(0);

  const maxTimeToAction = (player && player.max_remain_time_to_action) || null;
  const isPlayerTurn = player && player.seat_no === gameTable.currentSeatNo;

  useEffect(() => {
    if (!isPlayerTurn) return;
    if (!gameTable.inGame) return;

    setRemainTime(player.remain_time_to_action);

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
