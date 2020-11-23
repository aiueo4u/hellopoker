import { makeStyles } from '@material-ui/core/styles';

const styles = theme => ({
  badge: {
    marginRight: theme.spacing(1),
  },
  listItem: ({ isActive }) => ({
    color: isActive ? theme.palette.grey[30] : theme.palette.grey[500],
    height: '64px',
  }),
  label: {
    fontSize: theme.typography.body.fontSize,
    fontWeight: theme.typography.fontWeight.bold,
  },
  listItemIcon: ({ isActive }) => ({
    opacity: isActive ? '' : 0.3,
  }),
});

export default makeStyles(styles);
