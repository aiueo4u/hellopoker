import React from 'react';

import { Box, IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

import SideNavigation from 'components/navigation/SideNavigation';
import useDialogState from 'hooks/useDialogState';

const GlobalMenu = () => {
  const [isOpen, openMenu, closeMenu] = useDialogState();

  return (
    <>
      <Box position="fixed" zIndex="appBar" top={8} left={8}>
        <IconButton onClick={openMenu}>
          <MenuIcon />
        </IconButton>
      </Box>
      <SideNavigation isOpen={isOpen} onClose={closeMenu} />
    </>
  );
};

export default GlobalMenu;
