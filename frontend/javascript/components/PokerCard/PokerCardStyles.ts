import { makeStyles } from '@material-ui/styles';
import FaceBackImage from './faces/back.png';

type Props = {
  invisible: boolean;
  rank: string;
  size: string;
  suit: string;
};

export const useStyles = makeStyles((theme: any) => ({
  base: (props: Props) => {
    const { size } = props;

    return {
      backgroundColor: 'transparent',
      // 5:7
      [theme.breakpoints.up('sm')]: {
        width: size === 'small' ? '25px' : size === 'medium' ? '45px' : '72px',
        height: size === 'small' ? '35px' : size === 'medium' ? '63px' : '102px',
      },
      [theme.breakpoints.only('xs')]: {
        width: size === 'small' ? '25px' : size === 'medium' ? '30px' : '45px',
        height: size === 'small' ? '35px' : size === 'medium' ? '42px' : '63px',
      },
    };
  },
  inner: {
    position: 'relative',
    width: '100%',
    height: '100%',
  },
  card: (props: Props) => {
    const { invisible, size } = props;

    // const transform = position === 'left' ? 'rotateZ(-5deg)' : position === 'right' ? 'rotateZ(15deg)' : '';
    const borderRadius = size === 'small' ? '2px' : size === 'medium' ? '4px' : '6px';

    const base: any = {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius,
      boxShadow: theme.shadows[2],
      backgroundColor: theme.palette.common.white,
      transition: 'transform 0.8s',
      transform: invisible ? 'rotateY(180deg)' : 'rotateY(0deg)',
      backfaceVisibility: 'hidden',
    };
    return base;
  },
  back: (props: Props) => {
    const { invisible, size } = props;

    return {
      backgroundImage: `url(${FaceBackImage})`,
      backgroundPosition: '50% 50%',
      backgroundSize: '100% 100%',
      backgroundRepeat: 'no-repeat',
      backgroundColor: theme.palette.common.white,
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: size === 'small' ? '2px' : size === 'medium' ? '4px' : '6px',
      boxShadow: theme.shadows[2],
      transition: 'transform 0.8s',
      transform: invisible ? 'rotateY(0deg)' : 'rotateY(-180deg)',
      backfaceVisibility: 'hidden',
    };
  },
  faceSuit: (props: Props) => {
    const { size } = props;

    const fontSize = size === 'small' ? '20px' : size === 'medium' ? '40px' : '60px';

    return {
      position: 'absolute',
      top: size === 'medium' ? '60%' : '60%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      fontSize,
      [theme.breakpoints.only('xs')]: {
        top: '60%',
        fontSize: size === 'small' ? '10px' : size === 'medium' ? '20px' : '35px',
      },
    };
  },
  rank: (props: Props) => {
    const { rank, size } = props;

    const content = rank || '';
    const fontSize = size === 'small' ? '12px' : size === 'medium' ? '18px' : '28px';

    return {
      '&:before': {
        position: 'absolute',
        fontSize,
        textAlign: 'center',
        whiteSpace: 'pre-line',
        top: size === 'small' ? '2px' : size === 'medium' ? '4px' : '8px',
        left: size === 'small' ? '2px' : size === 'medium' ? '8px' : '12px',
        content: `"${content}"`,
        [theme.breakpoints.only('xs')]: {
          top: '4px',
          left: '6px',
          fontSize: size === 'small' ? '12px' : size === 'medium' ? '16px' : '20px',
        },
      },
    };
  },
  suit: (props: Props) => {
    const { suit } = props;
    return {
      color: suit === 's' || suit === 'c' ? theme.palette.common.black : 'red',
    };
  },
}));
