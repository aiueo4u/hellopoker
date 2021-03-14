import { useCallback, useState } from 'react';

const useDialogState = (initialIsOpen: boolean = false): [boolean, () => void, () => void] => {
  const [isOpen, setIsOpen] = useState(initialIsOpen);

  const openDialog = useCallback(() => setIsOpen(true), []);
  const closeDialog = useCallback(() => setIsOpen(false), []);

  return [isOpen, openDialog, closeDialog];
};

export default useDialogState;
