import { useDispatch } from 'react-redux';

const useChipAmountControlContainer = player => {
  const dispatch = useDispatch();

  const increment = amount => {
    dispatch({
      type: 'INCREMENT_BET_SIZE',
      playerId: player.id,
      playerStack: player.stack,
      amount,
    });
  };

  return increment;
};

export default useChipAmountControlContainer;
