import { makeStyles } from '@material-ui/core/styles';

const styles = theme => ({
  drawer: {
    width: '280px',
  },
  messageBadge: {
    position: 'fixed',
    bottom: theme.spacing(3),
    right: theme.spacing(3),
  },
  messageCreatedAt: {
    fontSize: theme.typography.body5.fontSize,
    marginLeft: '4px',
  },
  messageList: {
    position: 'absolute',
    top: '8px',
    width: '100%',
    height: 'calc(var(--vh, 1vh) * 100 - 60px - 16px)',
    overflow: 'scroll',
  },
  textFormContainer: {
    position: 'absolute',
    bottom: theme.spacing(1),
    width: '100%',
    height: '50px',
    padding: theme.spacing(0, 1),
  },
  textForm: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    border: `1px solid ${theme.palette.grey[400]}`,
    borderRadius: '4px',
    padding: theme.spacing(1),
  },
});

export default makeStyles(styles);
