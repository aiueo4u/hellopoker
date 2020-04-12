import { useState } from 'react';
import { useDispatch } from 'react-redux';

const useBuyInDialog = (tableId, seatNo) => {
  const dispatch = useDispatch();
  const [amount, setAmount] = useState('');

  const onSubmitTakeSeat = () => {
    dispatch({ type: 'PLAYER_TAKE_SEAT', tableId, seatNo, buyInAmount: amount })
  };

  const onChange = event => {
    setAmount(event.target.value);
  };

  return [amount, onSubmitTakeSeat, onChange];
};

export default useBuyInDialog;
