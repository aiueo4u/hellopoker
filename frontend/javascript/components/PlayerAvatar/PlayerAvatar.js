import React from 'react';
import PropTypes from 'prop-types';
//import classNames from 'classnames';

//import Avatar from '@material-ui/core/Avatar';
import WebRTCTest from 'components/WebRTCTest';

//import useStyles from './PlayerAvatarStyles';

const PlayerAvatar = ({ isTurn, player }) => {
  //const classes = useStyles();

  return <WebRTCTest player={player} isTurn={isTurn} />;
  //return <Avatar src={player.image_url} className={classNames(classes.avatar, { [classes.inTurn]: isTurn })} alt="" />;
};

PlayerAvatar.propTypes = {
  isTurn: PropTypes.bool.isRequired,
  player: PropTypes.object.isRequired,
};

export default PlayerAvatar;
