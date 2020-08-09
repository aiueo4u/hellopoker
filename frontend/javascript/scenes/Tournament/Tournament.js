import React from 'react';
import { Link } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import Grid from '@material-ui/core/Grid';

import Loading from 'components/Loading';
import TableCard from 'components/TableCard';
import useTournament from './hooks/useTournament';
import useStyles from './TournamentStyles';

function Tournament() {
  const classes = useStyles();
  const { tables, isReady, onClickEntry } = useTournament();

  if (!isReady) {
    return (
      <div style={{ height: 'calc(var(--vh, 1vh) * 100)' }}>
        <Loading />
      </div>
    );
  }

  return (
    <div className={classes.background}>
      <div>
        <Button onClick={onClickEntry} variant="contained">
          トーナメントにエントリーする
        </Button>
      </div>
      <div className={classes.container}>
        {tables.length > 0 && (
          <Grid container spacing={2}>
            {tables.map(table => (
              <Grid item key={table.id}>
                <TableCard table={table} />
              </Grid>
            ))}
          </Grid>
        )}
      </div>
      <div className={classes.newTableForm}>
        <Link to="/tables/new" className={classes.link}>
          <Fab className={classes.button} color="primary" variant="extended">
            新しくテーブルを作る
          </Fab>
        </Link>
      </div>
    </div>
  );
}

export default Tournament;
