import React, { memo } from 'react';
import PropTypes from 'prop-types';

import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';

import { formatDateCalendar } from 'utils/date';
import useStyles from './MessageListStyles';

const MessageList = ({ messages }) => {
  const classes = useStyles();

  return (
    <List>
      {messages.map(message => (
        <ListItem key={message.id}>
          <ListItemAvatar>
            <Avatar src={message.player.profileImageUrl} alt={message.player.nickname} />
          </ListItemAvatar>
          <ListItemText
            secondary={
              <span>
                {message.content}
                <span className={classes.createdAt}>{formatDateCalendar(message.createdAt)}</span>
              </span>
            }
          />
        </ListItem>
      ))}
    </List>
  );
};

MessageList.propTypes = {
  messages: PropTypes.array.isRequired,
};

export default memo(MessageList);
