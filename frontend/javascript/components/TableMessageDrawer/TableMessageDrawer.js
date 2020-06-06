import React from 'react';
import PropTypes from 'prop-types';

import Avatar from '@material-ui/core/Avatar';
import Badge from '@material-ui/core/Badge';
import Fab from '@material-ui/core/Fab';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/MailOutlined';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';

import useDialogState from 'hooks/useDialogState';
import useTableMessageChannel from 'hooks/useTableMessageChannel';
import { formatDateCalendar } from 'utils/date';
import useStyles from './TableMessageDrawerStyles';
import useTableMessageDrawer from './hooks/useTableMessageDrawer';

const TableMessageDrawer = ({ tableId }) => {
  const classes = useStyles();
  const { form, onChangeForm, onSubmit } = useTableMessageDrawer(tableId);
  const [isOpen, openDrawer, closeDrawer] = useDialogState();

  const { messages } = useTableMessageChannel(tableId, 'table-message-list');

  return (
    <>
      <Badge badgeContent={0} color="secondary" className={classes.messageBadge}>
        <Fab color="primary" onClick={openDrawer}>
          <MailIcon />
        </Fab>
      </Badge>
      <Drawer open={isOpen} onClose={closeDrawer} anchor="right" PaperProps={{ className: classes.drawer }}>
        <div className={classes.messageList} id="table-message-list">
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
                      <span className={classes.messageCreatedAt}>{formatDateCalendar(message.createdAt)}</span>
                    </span>
                  }
                />
              </ListItem>
            ))}
          </List>
        </div>
        <div className={classes.textFormContainer}>
          <div className={classes.textForm}>
            <InputBase
              name="content"
              variant="outlined"
              margin="dense"
              value={form.content}
              onChange={onChangeForm}
              onKeyPress={event => {
                if (event.key === 'Enter') onSubmit();
              }}
              autoFocus
            />
            <IconButton onClick={onSubmit} size="small">
              <PlayArrowIcon />
            </IconButton>
          </div>
        </div>
      </Drawer>
    </>
  );
};

TableMessageDrawer.propTypes = {
  tableId: PropTypes.string.isRequired,
};

export default TableMessageDrawer;
