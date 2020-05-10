import React from 'react';
import classNames from 'classnames';

import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/styles';
import WebRTCTest from 'components/WebRTCTest';

import styles from './PlayerAvatarStyles';

const useStyles = makeStyles(styles);

const PlayerAvatar = ({ isTurn, player }) => {
  const classes = useStyles();

  return <WebRTCTest player={player} isTurn={isTurn} />;

  return (
    <Avatar
      src={player.image_url}
      className={classNames(classes.avatar, { [classes.inTurn]: isTurn })}
      alt=""
    />
  );
};

export default PlayerAvatar;
