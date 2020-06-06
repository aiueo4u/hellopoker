import React from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

import useLogout from 'hooks/useLogout';
import useStyles from './SettingStyles';

const Setting = () => {
  const classes = useStyles();
  const logout = useLogout();

  return (
    <div>
      <Box>
        <Button variant="outlined" className={classes.button} onClick={logout}>
          ログアウト
        </Button>
      </Box>
    </div>
  );
};

export default Setting;
