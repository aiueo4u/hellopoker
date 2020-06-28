import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

import SeatedPlayer from './components/SeatedPlayer';
import useStyles from './TableCardStyles';

function TableCard({ table }) {
  const classes = useStyles();
  const history = useHistory();
  const onClickTable = () => history.push(`/tables/${table.id}`);

  return (
    <div className={classes.tableContainer}>
      <div className={classes.table} onClick={onClickTable}>
        <div className={classes.tableContent}>
          <div className={classes.tableName}>{table.name}</div>
          <div className={classes.tableBlind}>
            {table.sbSize}/{table.bbSize}
          </div>
        </div>
      </div>
      {table.players.map(player => (
        <SeatedPlayer key={player.id} player={player} />
      ))}
    </div>
  );
}

TableCard.propTypes = {
  table: PropTypes.object.isRequired,
};

export default TableCard;
