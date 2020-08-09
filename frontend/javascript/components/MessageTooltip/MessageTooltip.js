import React from 'react';
import PropTypes from 'prop-types';
import Tooltip from '@material-ui/core/Tooltip';

import useMessageTooltip from './hooks/useMessageTooltip';

const MessageTooltip = ({ player }) => {
  const { isOpen, message } = useMessageTooltip(player);

  return (
    <Tooltip title={message.content || ''} arrow open={isOpen} placement="top">
      <span />
    </Tooltip>
  );
};

MessageTooltip.propTypes = {
  player: PropTypes.object.isRequired,
};

export default MessageTooltip;
