import React from 'react';
import { Link } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/styles';

import useLogout from 'hooks/useLogout'; 
import styles from './HomeStyles';

const useStyles = makeStyles(styles);

function Home() {
  const classes = useStyles();
  const logout = useLogout();

  return (
    <div className={classes.container}>
      <Box>
        <Link to="/tables/new" className={classes.link}>
          <Button variant="outlined" className={classes.button}>
            新規テーブル作成
          </Button>
        </Link>
      </Box>
      <Box>
        <Link to="/tables" className={classes.link}>
          <Button variant="outlined" className={classes.button}>
            テーブル一覧
          </Button>
        </Link>
      </Box>
      <Box>
        <Button variant="outlined" className={classes.button} onClick={logout}>
          ログアウト
        </Button>
      </Box>
    </div>
  );
}

export default Home;
