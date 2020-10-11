import { makeStyles } from '@material-ui/styles';
import { blue, orange, red, yellow } from '@material-ui/core/colors';

const styles = theme => ({
  chip: ({ index }) => ({
    position: 'absolute',
    bottom: `calc(${index} * 6px)`,
    left: '50%',
    transform: 'translate(-50%, 0%)',
    width: '40px',
    height: '20px',
    //border: `1px solid ${theme.palette.common.black}`,
    [theme.breakpoints.only('xs')]: {
      width: '24px',
    },
  }),
  label: {
    color: theme.palette.common.black,
    fontSize: theme.typography.body6.fontSize,
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
  top: ({ index, label }) => {
    const base = {
      position: 'relative',
      width: '100%',
      height: '80%',
      //backgroundColor: '#FF7043',
      backgroundColor: theme.palette.grey[200],
      borderRadius: '50%',
      zIndex: index * 2 + 1,
      border: `2px solid ${theme.palette.grey[700]}`,
      //border: `1px solid blue`,
    };

    switch (label) {
      case 10000:
        return { ...base, backgroundColor: yellow[700] };
      case 5000:
        return { ...base, borderColor: blue[700] };
      case 1000:
        return { ...base, borderColor: red[700] };
      case 500:
        return { ...base, borderColor: orange[700] };
      default:
        return base;
    }
  },
  body: ({ index, label }) => {
    const base = {
      position: 'absolute',
      bottom: '0%',
      width: '100%',
      height: '60%',
      //border: `1px solid ${theme.palette.grey[700]}`,
      //backgroundColor: '#F4511E',
      backgroundColor: theme.palette.grey[700],
      borderRadius: '0 0 50% 50% / 0 0 calc(4500% / 60) calc(4500% / 60)',
      zIndex: index * 2,
    };

    switch (label) {
      case 10000:
        return { ...base, backgroundColor: yellow[700] };
      case 5000:
        return { ...base, backgroundColor: blue[700] };
      case 1000:
        return { ...base, backgroundColor: red[700] };
      case 500:
        return { ...base, backgroundColor: orange[700] };
      default:
        return base;
    }
  },
});

export default makeStyles(styles);
