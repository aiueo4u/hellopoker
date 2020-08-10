import { useCallback, useState } from 'react';

const useDialogState = (initialIsOpen = false) => {
  const [isOpen, setIsOpen] = useState(initialIsOpen);

  const openDialog = useCallback(() => setIsOpen(true), []);
  const closeDialog = useCallback(() => setIsOpen(false), []);

  return [isOpen, openDialog, closeDialog];
};

export default useDialogState;
