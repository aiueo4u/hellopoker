import React from 'react';
import { Link } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

import Loading from 'components/Loading';
import TableRowContent from './components/TableRowContent';
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
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>テーブル名</TableCell>
            <TableCell>参加人数</TableCell>
            <TableCell />
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {tables.map(table => (
            <TableRowContent table={table} key={table.id} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default TableList;
