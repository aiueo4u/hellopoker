import { makeStyles } from '@material-ui/core';
import { orange } from '@material-ui/core/colors';

export const useChipAmountControlContainerStyles = makeStyles((theme: any) => ({
  button: {
    backgroundColor: orange[700],
    color: theme.palette.common.white,
    width: '100px',
    // height: '100%',
    // margin: theme.spacing(0, 2),
    touchAction: 'manipulation',
    textTransform: 'none',
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.3)',
    },
  },
  container: {
    // width: '400px',
    padding: theme.spacing(2),
    // height: '300px',
    // display: 'flex',
    // alignItems: 'center',
    // justifyContent: 'space-around',
  },
}));
