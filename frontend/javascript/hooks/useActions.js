import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { actionToGameDealer } from 'api';

const useActions = (tableId, player, gameTable) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(false);
  }, [gameTable.round, gameTable.currentSeatNo]);

  const betAction = async () => {
    setLoading(true);
    await actionToGameDealer('PLAYER_ACTION_BET_CHIPS', tableId, player.betSize);
  };

  const callAction = async () => {
    setLoading(true);
    await actionToGameDealer('PLAYER_ACTION_CALL', tableId);
  };

  const checkAction = async () => {
    setLoading(true);
    await actionToGameDealer('PLAYER_ACTION_CHECK', tableId);
  };

  const foldAction = async () => {
    setLoading(true);
    await actionToGameDealer('PLAYER_ACTION_FOLD', tableId);
  };

  const muckAction = async () => {
    setLoading(true);
    await actionToGameDealer('PLAYER_ACTION_MUCK_HAND', tableId);
  };

  const resetBetSize = () => {
    dispatch({ type: 'RESET_BET_SIZE', tableId, playerId: player.id });
  };

  const showAction = async () => {
    setLoading(true);
    await actionToGameDealer('PLAYER_ACTION_SHOW_HAND', tableId);
  };

  return [betAction, callAction, checkAction, foldAction, muckAction, resetBetSize, showAction, loading];
};

export default useActions;
