import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { makeStyles } from '@material-ui/styles';

import styles from './TableRowContentStyles';

const useStyles = makeStyles(styles);

function TableRowContent({ table }) {
  const classes = useStyles();

  return (
    <TableRow>
      <TableCell>{table.name}</TableCell>
      <TableCell>{table.players.length} 名</TableCell>
      <TableCell>
        <Link to={`/tables/${table.id}`} className={classes.link}>
          <Button variant="outlined">参加</Button>
        </Link>
      </TableCell>
    </TableRow>
  );
}

TableRowContent.propTypes = {
  table: PropTypes.object.isRequired,
};

export default TableRowContent;
