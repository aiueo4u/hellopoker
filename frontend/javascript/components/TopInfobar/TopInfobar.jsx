import React from 'react'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import { roundToReadable } from 'utils/label'
import styles from './TopInfobarStyles'

const useStyles = makeStyles(styles)

function TopInfobar({ handCount, round }) {
  const classes = useStyles()

  return (
    <div className={classes.container}>
      <Typography variant="caption" className={classes.round}>
        {roundToReadable(round)}
      </Typography>
      <Typography variant="caption" className={classes.handCount}>
        第
        {handCount}
        ゲーム
      </Typography>
    </div>
  );
};

export default TopInfobar;
