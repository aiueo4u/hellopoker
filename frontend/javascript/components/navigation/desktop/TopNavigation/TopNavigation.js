import React from 'react';

import { AppBar, Avatar, Box, IconButton, Link, Toolbar, Typography } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

import SideNavigation from 'components/navigation/SideNavigation';
import useDialogState from 'hooks/useDialogState';
import usePlayerSessionState from 'hooks/usePlayerSessionState';

const TopNavigation = () => {
  const [isOpen, openMenu, closeMenu] = useDialogState();
  const { currentPlayer, isLoggedIn } = usePlayerSessionState();

  if (!isLoggedIn) return;

  return (
    <>
      <AppBar position="relative">
        <Toolbar>
          <Box mr={2}>
            <IconButton color="inherit" edge="start" onClick={openMenu}>
              <MenuIcon />
            </IconButton>
          </Box>

          <Link href="/" style={{ color: 'inherit', textDecoration: 'none' }}>
            <Typography variant="h6" noWrap>
              Hello Poker
            </Typography>
          </Link>

          <div style={{ flexGrow: 1 }} />

          <IconButton>
            <Avatar src={currentPlayer.profileImageUrl} />
          </IconButton>
          <div>{currentPlayer.name}</div>
        </Toolbar>
      </AppBar>
      <SideNavigation isOpen={isOpen} onClose={closeMenu} />
    </>
  );
};

export default TopNavigation;
