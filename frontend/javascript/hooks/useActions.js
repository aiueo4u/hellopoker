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
    await actionToGameDealer('PLAYER_ACTION_BET_CHIPS', tableId, player.id, player.betSize);
  };

  const callAction = async () => {
    setLoading(true);
    await actionToGameDealer('PLAYER_ACTION_CALL', tableId, player.id);
  };

  const checkAction = async () => {
    setLoading(true);
    await actionToGameDealer('PLAYER_ACTION_CHECK', tableId, player.id);
  };

  const foldAction = async () => {
    setLoading(true);
    await actionToGameDealer('PLAYER_ACTION_FOLD', tableId, player.id);
  };

  const muckAction = async () => {
    setLoading(true);
    await actionToGameDealer('PLAYER_ACTION_MUCK_HAND', tableId, player.id);
  };

  const resetBetSize = () => {
    dispatch({ type: 'RESET_BET_SIZE', tableId, playerId: player.id });
  };

  const showAction = async () => {
    setLoading(true);
    await actionToGameDealer('PLAYER_ACTION_SHOW_HAND', tableId, player.id);
  };

  return [betAction, callAction, checkAction, foldAction, muckAction, resetBetSize, showAction, loading];
};

export default useActions;
