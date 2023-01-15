import React from 'react';

import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import HomeIcon from '@material-ui/icons/Home';
import MailIcon from '@material-ui/icons/MailOutlined';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SettingsIcon from '@material-ui/icons/Settings';
import PropTypes from 'prop-types';

import useStyles from './SideNavigationStyles';
import ListItemLink from './components/ListItemLink';

const SideNavigation = ({ isOpen, onClose }) => {
  const classes = useStyles();

  return (
    <Drawer open={isOpen} anchor="left" onClose={onClose}>
      <List className={classes.list}>
        <ListItem className={classes.head}>Hello Poker</ListItem>
        <ListItemLink label="ホーム" href="/" icon={<HomeIcon />} closeMenu={onClose} />
        <ListItemLink label="ポーカー" href="/tables" icon={<PlayArrowIcon />} closeMenu={onClose} />
        <ListItemLink label="メッセージ" href="/messages" icon={<MailIcon />} closeMenu={onClose} />
        <ListItemLink label="設定" href="/settings" icon={<SettingsIcon />} closeMenu={onClose} />
      </List>
    </Drawer>
  );
};

SideNavigation.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default SideNavigation;
