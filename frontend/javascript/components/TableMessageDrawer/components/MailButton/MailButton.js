import React, { memo } from 'react';

import Badge from '@material-ui/core/Badge';
import Fab from '@material-ui/core/Fab';
import MailIcon from '@material-ui/icons/MailOutlined';
import PropTypes from 'prop-types';

const MailButton = ({ onClick }) => (
  <Badge badgeContent={0} color="secondary">
    <Fab color="primary" onClick={onClick}>
      <MailIcon />
    </Fab>
  </Badge>
);

MailButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default memo(MailButton);
