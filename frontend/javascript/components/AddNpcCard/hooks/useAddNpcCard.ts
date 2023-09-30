import { useDispatch } from 'react-redux';

import useDialogState from 'hooks/useDialogState';

type Props = {
  tableId: string;
  seatNo: number;
};

export const useAddNpcCard = ({ tableId, seatNo }: Props) => {
  const [isOpen, openDialog, closeDialog] = useDialogState();

  const dispatch = useDispatch();
  const addNpcPlayer = () => {
    dispatch({ type: 'ADD_NPC_PLAYER', tableId, seatNo });
  };

  return { isOpen, openDialog, closeDialog, addNpcPlayer };
};
