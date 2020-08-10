import React, { memo } from 'react';
import PropTypes from 'prop-types';

import Box from '@material-ui/core/Box';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';

import useDialogState from 'hooks/useDialogState';
import useTableMessageChannel from 'hooks/useTableMessageChannel';

import MailButton from './components/MailButton';
import MessageList from './components/MessageList';
import useStyles from './TableMessageDrawerStyles';
import useTableMessageDrawer from './hooks/useTableMessageDrawer';

const TableMessageDrawer = ({ tableId }) => {
  const classes = useStyles();
  const { form, onChangeForm, onSubmit } = useTableMessageDrawer(tableId);
  const [isOpen, openDrawer, closeDrawer] = useDialogState();

  const { messages } = useTableMessageChannel(tableId, 'table-message-list');

  return (
    <>
      <Box position="fixed" bottom={24} right={24}>
        <MailButton onClick={openDrawer} />
      </Box>
      <Drawer open={isOpen} onClose={closeDrawer} anchor="right" PaperProps={{ className: classes.drawer }}>
        <div className={classes.messageList} id="table-message-list">
          <MessageList messages={messages} />
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

export default memo(TableMessageDrawer);
