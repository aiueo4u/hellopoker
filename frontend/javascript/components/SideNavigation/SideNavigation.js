import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import HomeIcon from '@material-ui/icons/Home';
import MailIcon from '@material-ui/icons/MailOutlined';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SettingsIcon from '@material-ui/icons/Settings';

import ListItemLink from './components/ListItemLink';
import useStyles from './SideNavigationStyles';

const SideNavigation = () => {
  const classes = useStyles();

  return (
    <List>
      <ListItem className={classes.head}>Hello, Poker!（仮）</ListItem>
      <ListItemLink label="ホーム" href="/" icon={<HomeIcon />} />
      <ListItemLink label="ポーカー" href="/tables" icon={<PlayArrowIcon />} />
      <ListItemLink label="メッセージ" href="/messages" icon={<MailIcon />} />
      <ListItemLink label="設定" href="/settings" icon={<SettingsIcon />} />
    </List>
  );
};

export default SideNavigation;
