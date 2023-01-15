import * as React from 'react';

import Fab from '@material-ui/core/Fab';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';

import Loading from 'components/Loading';
import TableCard from 'components/TableCard';

import { useStyles } from './TableListStyles';
import { useTableList } from './hooks/useTableList';

export const TableList = () => {
  const classes = useStyles();
  const [tables, isReady]: any = useTableList();

  if (!isReady) {
    return (
      <div style={{ height: 'calc(var(--vh, 1vh) * 100)' }}>
        <Loading />
      </div>
    );
  }

  return (
    <div className={classes.background}>
      <Link to="/tournaments">トーナメントはこちら</Link>
      <div className={classes.container}>
        {tables.length > 0 && (
          <Grid container spacing={2} justify="space-around">
            {tables.map((table: any) => (
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
};
