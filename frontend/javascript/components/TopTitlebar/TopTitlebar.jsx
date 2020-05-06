import React from 'react'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import { roundToReadable } from 'utils/label'
import styles from './TopTitlebarStyles'

const useStyles = makeStyles(styles)

function TopTitlebar({ gameTable }) {
  const classes = useStyles()

  return (
    <div className={classes.container}>
      <Typography variant="caption" className={classes.title}>
        {gameTable.title}
      </Typography>
    </div>
  );
};

export default TopTitlebar;
