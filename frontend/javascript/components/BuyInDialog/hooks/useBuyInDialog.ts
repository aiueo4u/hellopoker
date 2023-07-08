import * as React from 'react';

import { useDispatch } from 'react-redux';

type Props = {
  tableId: string;
  seatNo: number;
};

export const useBuyInDialog = ({ tableId, seatNo }: Props) => {
  const dispatch = useDispatch();
  const [amount, setAmount] = React.useState(10000);

  const onSubmitTakeSeat = () => {
    dispatch({ type: 'PLAYER_TAKE_SEAT', tableId, seatNo, buyInAmount: amount });
  };

  const onChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = event => {
    const value = Number(event.target.value);
    setAmount(value);
  };

  return { amount, onSubmitTakeSeat, onChange };
};
