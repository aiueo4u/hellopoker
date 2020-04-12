import React from 'react';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

import Loading from 'components/Loading';
import TableRowContent from './components/TableRowContent';
import useTableList from './hooks/useTableList';

function TableList() {
  const [tables, isReady] = useTableList();

  if (!isReady) {
    return (
      <div style={{ height: '100vh' }}>
        <Loading />
      </div>
    );
  }

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>テーブル名</TableCell>
          <TableCell>参加人数</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {tables.map(table => (
          <TableRowContent table={table} key={table.id} />
        ))}
      </TableBody>
    </Table>
  );
}

export default TableList;
