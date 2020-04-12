import React from 'react';

import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/styles';

import styles from './PlayerAvatarStyles';

const useStyles = makeStyles(styles);

const PlayerAvatar = ({ isTurn, player }) => {
  const classes = useStyles({ isTurn });

  return (
    <Avatar src={player.image_url} className={classes.avatar} alt="" />
  );
};

export default PlayerAvatar;
