import { useDispatch } from 'react-redux';

const useActions = (tableId, player) => {
  const dispatch = useDispatch();

  const betAction = () => dispatch({ type: 'BET_ACTION', tableId, playerId: player.id, amount: player.betSize });
  const callAction = () => dispatch({ type: 'CALL_ACTION', tableId, playerId: player.id });
  const checkAction = () => dispatch({ type: 'CHECK_ACTION', tableId, playerId: player.id });
  const foldAction = () => dispatch({ type: 'FOLD_ACTION', tableId, playerId: player.id });
  const muckAction = () => dispatch({ type: 'MUCK_HAND_ACTION', tableId, playerId: player.id });
  const resetBetSize = () => dispatch({ type: 'RESET_BET_SIZE', tableId, playerId: player.id });
  const showAction = () => dispatch({ type: 'SHOW_HAND_ACTION', tableId, playerId: player.id });

  return [
    betAction,
    callAction,
    checkAction,
    foldAction,
    muckAction,
    resetBetSize,
    showAction,
  ];
};

export default useActions;
