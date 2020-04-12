import { useState } from 'react';

const useDialogState = (initialIsOpen = false) => {
  const [isOpen, setIsOpen] = useState(initialIsOpen);

  const openDialog = () => setIsOpen(true);
  const closeDialog = () => setIsOpen(false);

  return [isOpen, openDialog, closeDialog];
};

export default useDialogState;
