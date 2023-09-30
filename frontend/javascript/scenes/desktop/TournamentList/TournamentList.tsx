import * as React from 'react';

import Fab from '@material-ui/core/Fab';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';

import { Loading } from 'components/Loading';
import CreateTournamentFormDialog from 'components/tournament/CreateTournamentFormDialog';
import useDialogState from 'hooks/useDialogState';
import useTournamentList from 'hooks/useTournamentList';

import { useStyles } from './TournamentListStyles';

export const TournamentList = () => {
  const classes = useStyles();
  const { tournaments, isReady } = useTournamentList();
  const [isOpen, openDialog, closeDialog] = useDialogState();

  if (!isReady) {
    return (
      <div style={{ height: 'calc(var(--vh, 1vh) * 100)' }}>
        <Loading />
      </div>
    );
  }

  return (
    <div className={classes.background}>
      <div className={classes.container}>
        <Typography>トーナメントの一覧</Typography>
        {tournaments.length > 0 && (
          <Grid container spacing={2}>
            {tournaments.map((tournament: any) => (
              <Grid item key={tournament.id}>
                <Link to={`/tournaments/${tournament.id}`}>{tournament.name}</Link>
                {tournament.isStarted && <span>開催中</span>}
              </Grid>
            ))}
          </Grid>
        )}
      </div>
      <div className={classes.newTableForm}>
        <Fab className={classes.button} color="primary" variant="extended" onClick={openDialog}>
          新しくトーナメントを作る
        </Fab>
      </div>
      <CreateTournamentFormDialog isOpen={isOpen} onClose={closeDialog} />
    </div>
  );
};
