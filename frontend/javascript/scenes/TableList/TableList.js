import React from 'react';
import { Link } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import Loading from 'components/Loading';
import TableCard from './components/TableCard';
import useTableList from './hooks/useTableList';
import useStyles from './TableListStyles';

function TableList() {
  const classes = useStyles();
  const [tables, isReady] = useTableList();

  if (!isReady) {
    return (
      <div style={{ height: 'calc(var(--vh, 1vh) * 100)' }}>
        <Loading />
      </div>
    );
  }

  return (
    <div>
      <Link to="/tables/new" className={classes.link}>
        <Button variant="outlined" className={classes.button}>
          新規テーブル作成
        </Button>
      </Link>
      <Grid container spacing={2}>
        {tables.map(table => (
          <Grid item key={table.id}>
            <TableCard table={table} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default TableList;
