import { useSelector } from 'react-redux';

const useMessageTooltip = player => {
  const { balloonMessageByPlayerId, isOpenBalloonByPlayerId } = useSelector(state => state.tableMessage);

  const isOpen = isOpenBalloonByPlayerId[player.id] || false;
  const message = balloonMessageByPlayerId[player.id] || {};

  return { isOpen, message };
};

export default useMessageTooltip;
