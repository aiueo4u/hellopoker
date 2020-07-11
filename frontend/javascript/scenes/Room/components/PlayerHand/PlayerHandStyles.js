import { makeStyles } from '@material-ui/styles';

const cardPosition = {
  0: {
    l: {
      sm: { top: 'calc(50% + 330px)', left: 'calc(50% + 110px)' },
      xs: { top: 'calc(50% + 280px)', left: 'calc(50% + 60px)' },
    },
    r: {
      sm: { top: 'calc(50% + 330px)', left: 'calc(50% + 150px)' },
      xs: { top: 'calc(50% + 280px)', left: 'calc(50% + 90px)' },
    },
  },
  1: {
    l: {
      sm: { top: 'calc(50% + 200px)', left: 'calc(50% - 380px)' },
      xs: { top: 'calc(50% + 160px)', left: 'calc(50% - 160px)' },
    },
    r: {
      sm: { top: 'calc(50% + 200px)', left: 'calc(50% - 340px)' },
      xs: { top: 'calc(50% + 160px)', left: 'calc(50% - 130px)' },
    },
  },
  2: {
    l: {
      sm: { top: 'calc(50% - 120px)', left: 'calc(50% - 380px)' },
      xs: { top: 'calc(50% - 40px)', left: 'calc(50% - 160px)' },
    },
    r: {
      sm: { top: 'calc(50% - 120px)', left: 'calc(50% - 340px)' },
      xs: { top: 'calc(50% - 40px)', left: 'calc(50% - 130px)' },
    },
  },
  3: {
    l: {
      sm: { top: 'calc(50% - 260px)', left: 'calc(50% + 100px)' },
      xs: { top: 'calc(50% - 230px)', left: 'calc(50% + 60px)' },
    },
    r: {
      sm: { top: 'calc(50% - 260px)', left: 'calc(50% + 140px)' },
      xs: { top: 'calc(50% - 230px)', left: 'calc(50% + 90px)' },
    },
  },
  4: {
    l: {
      sm: { top: 'calc(50% - 120px)', left: 'calc(50% + 380px)' },
      xs: { top: 'calc(50% - 40px)', left: 'calc(50% + 160px)' },
    },
    r: {
      sm: { top: 'calc(50% - 120px)', left: 'calc(50% + 340px)' },
      xs: { top: 'calc(50% - 40px)', left: 'calc(50% + 130px)' },
    },
  },
  5: {
    l: {
      sm: { top: 'calc(50% + 200px)', left: 'calc(50% + 380px)' },
      xs: { top: 'calc(50% + 160px)', left: 'calc(50% + 160px)' },
    },
    r: {
      sm: { top: 'calc(50% + 200px)', left: 'calc(50% + 340px)' },
      xs: { top: 'calc(50% + 160px)', left: 'calc(50% + 130px)' },
    },
  },
};

const styles = theme => ({
  '@keyframes deal0l': {
    '0%': { transform: 'translate(-50%, -50%) rotateZ(0deg)' },
    '100%': {
      top: cardPosition['0'].l.sm.top,
      left: cardPosition['0'].l.sm.left,
      transform: 'translate(-50%, -50%) rotateZ(1800deg)',
    },
  },
  '@keyframes deal0r': {
    '0%': { transform: 'translate(-50%, -50%) rotateZ(0deg)' },
    '100%': {
      top: cardPosition['0'].r.sm.top,
      left: cardPosition['0'].r.sm.left,
      transform: 'translate(-50%, -50%) rotateZ(1800deg)',
    },
  },
  '@keyframes deal1l': {
    '0%': { transform: 'translate(-50%, -50%) rotateZ(0deg)' },
    '100%': {
      top: cardPosition['1'].l.sm.top,
      left: cardPosition['1'].l.sm.left,
      transform: 'translate(-50%, -50%) rotateZ(1800deg)',
    },
  },
  '@keyframes deal1r': {
    '0%': { transform: 'translate(-50%, -50%) rotateZ(0deg)' },
    '100%': {
      top: cardPosition['1'].r.sm.top,
      left: cardPosition['1'].r.sm.left,
      transform: 'translate(-50%, -50%) rotateZ(1800deg)',
    },
  },
  '@keyframes deal2l': {
    '0%': { transform: 'translate(-50%, -50%) rotateZ(0deg)' },
    '100%': {
      top: cardPosition['2'].l.sm.top,
      left: cardPosition['2'].l.sm.left,
      transform: 'translate(-50%, -50%) rotateZ(1800deg)',
    },
  },
  '@keyframes deal2r': {
    '0%': { transform: 'translate(-50%, -50%) rotateZ(0deg)' },
    '100%': {
      top: cardPosition['2'].r.sm.top,
      left: cardPosition['2'].r.sm.left,
      transform: 'translate(-50%, -50%) rotateZ(1800deg)',
    },
  },
  '@keyframes deal3l': {
    '0%': { transform: 'translate(-50%, -50%) rotateZ(0deg)' },
    '100%': {
      top: cardPosition['3'].l.sm.top,
      left: cardPosition['3'].l.sm.left,
      transform: 'translate(-50%, -50%) rotateZ(1800deg)',
    },
  },
  '@keyframes deal3r': {
    '0%': { transform: 'translate(-50%, -50%) rotateZ(0deg)' },
    '100%': {
      top: cardPosition['3'].r.sm.top,
      left: cardPosition['3'].r.sm.left,
      transform: 'translate(-50%, -50%) rotateZ(1800deg)',
    },
  },
  '@keyframes deal4l': {
    '0%': { transform: 'translate(-50%, -50%) rotateZ(0deg)' },
    '100%': {
      top: cardPosition['4'].l.sm.top,
      left: cardPosition['4'].l.sm.left,
      transform: 'translate(-50%, -50%) rotateZ(1800deg)',
    },
  },
  '@keyframes deal4r': {
    '0%': { transform: 'translate(-50%, -50%) rotateZ(0deg)' },
    '100%': {
      top: cardPosition['4'].r.sm.top,
      left: cardPosition['4'].r.sm.left,
      transform: 'translate(-50%, -50%) rotateZ(1800deg)',
    },
  },
  '@keyframes deal5l': {
    '0%': { transform: 'translate(-50%, -50%) rotateZ(0deg)' },
    '100%': {
      top: cardPosition['5'].l.sm.top,
      left: cardPosition['5'].l.sm.left,
      transform: 'translate(-50%, -50%) rotateZ(1800deg)',
    },
  },
  '@keyframes deal5r': {
    '0%': { transform: 'translate(-50%, -50%) rotateZ(0deg)' },
    '100%': {
      top: cardPosition['5'].r.sm.top,
      left: cardPosition['5'].r.sm.left,
      transform: 'translate(-50%, -50%) rotateZ(1800deg)',
    },
  },
  '@keyframes show0l': {
    '0%': { top: cardPosition['0'].l.sm.top, left: cardPosition['0'].l.sm.left },
    '100%': { top: 'calc(50% + 100px)', left: 'calc(50% + 100px)' },
  },
  '@keyframes show0r': {
    '0%': { top: cardPosition['0'].r.sm.top, left: cardPosition['0'].r.sm.left },
    '100%': { top: 'calc(50% + 100px)', left: 'calc(50% + 140px)' },
  },
  '@keyframes show1l': {
    '0%': { top: cardPosition['1'].l.sm.top, left: cardPosition['1'].l.sm.left },
    '100%': { top: 'calc(50% + 100px)', left: 'calc(50% - 240px)' },
  },
  '@keyframes show1r': {
    '0%': { top: cardPosition['1'].r.sm.top, left: cardPosition['1'].r.sm.left },
    '100%': { top: 'calc(50% + 100px)', left: 'calc(50% - 200px)' },
  },
  '@keyframes show2l': {
    '0%': { top: cardPosition['2'].l.sm.top, left: cardPosition['2'].l.sm.left },
    '100%': { top: 'calc(50% - 120px)', left: 'calc(50% - 240px)' },
  },
  '@keyframes show2r': {
    '0%': { top: cardPosition['2'].r.sm.top, left: cardPosition['2'].r.sm.left },
    '100%': { top: 'calc(50% - 120px)', left: 'calc(50% - 200px)' },
  },
  '@keyframes show3l': {
    '0%': { top: cardPosition['3'].l.sm.top, left: cardPosition['3'].l.sm.left },
    '100%': { top: 'calc(50% - 120px)', left: 'calc(50% + 100px)' },
  },
  '@keyframes show3r': {
    '0%': { top: cardPosition['3'].r.sm.top, left: cardPosition['3'].r.sm.left },
    '100%': { top: 'calc(50% - 120px)', left: 'calc(50% + 140px)' },
  },
  '@keyframes show4l': {
    '0%': { top: cardPosition['4'].l.sm.top, left: cardPosition['4'].l.sm.left },
    '100%': { top: 'calc(50% - 120px)', left: 'calc(50% + 200px)' },
  },
  '@keyframes show4r': {
    '0%': { top: cardPosition['4'].r.sm.top, left: cardPosition['4'].r.sm.left },
    '100%': { top: 'calc(50% - 120px)', left: 'calc(50% + 240px)' },
  },
  '@keyframes show5l': {
    '0%': { top: cardPosition['5'].l.sm.top, left: cardPosition['5'].l.sm.left },
    '100%': { top: 'calc(50% + 100px)', left: 'calc(50% + 200px)' },
  },
  '@keyframes show5r': {
    '0%': { top: cardPosition['5'].r.sm.top, left: cardPosition['5'].r.sm.left },
    '100%': { top: 'calc(50% + 100px)', left: 'calc(50% + 240px)' },
  },
  '@keyframes muck0l': {
    '0%': { top: cardPosition['0'].l.sm.top, left: cardPosition['0'].l.sm.left },
    '100%': { top: 'calc(50% + 100px)', left: 'calc(50% + 100px)', opacity: 0 },
  },
  '@keyframes muck0r': {
    '0%': { top: cardPosition['0'].r.sm.top, left: cardPosition['0'].r.sm.left },
    '100%': { top: 'calc(50% + 100px)', left: 'calc(50% + 140px)', opacity: 0 },
  },
  '@keyframes muck1l': {
    '0%': { top: cardPosition['1'].l.sm.top, left: cardPosition['1'].l.sm.left },
    '100%': { top: 'calc(50% + 100px)', left: 'calc(50% - 240px)', opacity: 0 },
  },
  '@keyframes muck1r': {
    '0%': { top: cardPosition['1'].r.sm.top, left: cardPosition['1'].r.sm.left },
    '100%': { top: 'calc(50% + 100px)', left: 'calc(50% - 200px)', opacity: 0 },
  },
  '@keyframes muck2l': {
    '0%': { top: cardPosition['2'].l.sm.top, left: cardPosition['2'].l.sm.left },
    '100%': { top: 'calc(50% - 120px)', left: 'calc(50% - 240px)', opacity: 0 },
  },
  '@keyframes muck2r': {
    '0%': { top: cardPosition['2'].r.sm.top, left: cardPosition['2'].r.sm.left },
    '100%': { top: 'calc(50% - 120px)', left: 'calc(50% - 200px)', opacity: 0 },
  },
  '@keyframes muck3l': {
    '0%': { top: cardPosition['3'].l.sm.top, left: cardPosition['3'].l.sm.left },
    '100%': { top: 'calc(50% - 120px)', left: 'calc(50% + 100px)', opacity: 0 },
  },
  '@keyframes muck3r': {
    '0%': { top: cardPosition['3'].r.sm.top, left: cardPosition['3'].r.sm.left },
    '100%': { top: 'calc(50% - 120px)', left: 'calc(50% + 140px)', opacity: 0 },
  },
  '@keyframes muck4l': {
    '0%': { top: cardPosition['4'].l.sm.top, left: cardPosition['4'].l.sm.left },
    '100%': { top: 'calc(50% - 120px)', left: 'calc(50% + 200px)', opacity: 0 },
  },
  '@keyframes muck4r': {
    '0%': { top: cardPosition['4'].r.sm.top, left: cardPosition['4'].r.sm.left },
    '100%': { top: 'calc(50% - 120px)', left: 'calc(50% + 240px)', opacity: 0 },
  },
  '@keyframes muck5l': {
    '0%': { top: cardPosition['5'].l.sm.top, left: cardPosition['5'].l.sm.left },
    '100%': { top: 'calc(50% + 100px)', left: 'calc(50% + 200px)', opacity: 0 },
  },
  '@keyframes muck5r': {
    '0%': { top: cardPosition['5'].r.sm.top, left: cardPosition['5'].r.sm.left },
    '100%': { top: 'calc(50% + 100px)', left: 'calc(50% + 240px)', opacity: 0 },
  },
  base: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
  dealt0Left: {
    [theme.breakpoints.up('sm')]: { top: cardPosition['0'].l.sm.top, left: cardPosition['0'].l.sm.left },
    [theme.breakpoints.only('xs')]: { top: cardPosition['0'].l.xs.top, left: cardPosition['0'].l.xs.left },
  },
  dealt0Right: {
    [theme.breakpoints.up('sm')]: { top: cardPosition['0'].r.sm.top, left: cardPosition['0'].r.sm.left },
    [theme.breakpoints.only('xs')]: { top: cardPosition['0'].r.xs.top, left: cardPosition['0'].r.xs.left },
  },
  dealt1Left: {
    [theme.breakpoints.up('sm')]: { top: cardPosition['1'].l.sm.top, left: cardPosition['1'].l.sm.left },
    [theme.breakpoints.only('xs')]: { top: cardPosition['1'].l.xs.top, left: cardPosition['1'].l.xs.left },
  },
  dealt1Right: {
    [theme.breakpoints.up('sm')]: { top: cardPosition['1'].r.sm.top, left: cardPosition['1'].r.sm.left },
    [theme.breakpoints.only('xs')]: { top: cardPosition['1'].r.xs.top, left: cardPosition['1'].r.xs.left },
  },
  dealt2Left: {
    [theme.breakpoints.up('sm')]: { top: cardPosition['2'].l.sm.top, left: cardPosition['2'].l.sm.left },
    [theme.breakpoints.only('xs')]: { top: cardPosition['2'].l.xs.top, left: cardPosition['2'].l.xs.left },
  },
  dealt2Right: {
    [theme.breakpoints.up('sm')]: { top: cardPosition['2'].r.sm.top, left: cardPosition['2'].r.sm.left },
    [theme.breakpoints.only('xs')]: { top: cardPosition['2'].r.xs.top, left: cardPosition['2'].r.xs.left },
  },
  dealt3Left: {
    [theme.breakpoints.up('sm')]: { top: cardPosition['3'].l.sm.top, left: cardPosition['3'].l.sm.left },
    [theme.breakpoints.only('xs')]: { top: cardPosition['3'].l.xs.top, left: cardPosition['3'].l.xs.left },
  },
  dealt3Right: {
    [theme.breakpoints.up('sm')]: { top: cardPosition['3'].r.sm.top, left: cardPosition['3'].r.sm.left },
    [theme.breakpoints.only('xs')]: { top: cardPosition['3'].r.xs.top, left: cardPosition['3'].r.xs.left },
  },
  dealt4Left: {
    [theme.breakpoints.up('sm')]: { top: cardPosition['4'].l.sm.top, left: cardPosition['4'].l.sm.left },
    [theme.breakpoints.only('xs')]: { top: cardPosition['4'].l.xs.top, left: cardPosition['4'].l.xs.left },
  },
  dealt4Right: {
    [theme.breakpoints.up('sm')]: { top: cardPosition['4'].r.sm.top, left: cardPosition['4'].r.sm.left },
    [theme.breakpoints.only('xs')]: { top: cardPosition['4'].r.xs.top, left: cardPosition['4'].r.xs.left },
  },
  dealt5Left: {
    [theme.breakpoints.up('sm')]: { top: cardPosition['5'].l.sm.top, left: cardPosition['5'].l.sm.left },
    [theme.breakpoints.only('xs')]: { top: cardPosition['5'].l.xs.top, left: cardPosition['5'].l.xs.left },
  },
  dealt5Right: {
    [theme.breakpoints.up('sm')]: { top: cardPosition['5'].r.sm.top, left: cardPosition['5'].r.sm.left },
    [theme.breakpoints.only('xs')]: { top: cardPosition['5'].r.xs.top, left: cardPosition['5'].r.xs.left },
  },
  position0Left: {
    [theme.breakpoints.up('sm')]: { animation: '$deal0l 0.6s 0.0s forwards' },
    [theme.breakpoints.only('xs')]: { animation: '$deal0l 0.6s 0.0s forwards' },
  },
  position1Left: {
    [theme.breakpoints.up('sm')]: { animation: '$deal1l 0.6s 0.1s forwards' },
    [theme.breakpoints.only('xs')]: { animation: '$deal1l 0.6s 0.1s forwards' },
  },
  position2Left: {
    [theme.breakpoints.up('sm')]: { animation: '$deal2l 0.6s 0.2s forwards' },
    [theme.breakpoints.only('xs')]: { animation: '$deal2l 0.6s 0.2s forwards' },
  },
  position3Left: {
    [theme.breakpoints.up('sm')]: { animation: '$deal3l 0.6s 0.3s forwards' },
    [theme.breakpoints.only('xs')]: { animation: '$deal3l 0.6s 0.3s forwards' },
  },
  position4Left: {
    [theme.breakpoints.up('sm')]: { animation: '$deal4l 0.6s 0.4s forwards' },
    [theme.breakpoints.only('xs')]: { animation: '$deal4l 0.6s 0.4s forwards' },
  },
  position5Left: {
    [theme.breakpoints.up('sm')]: { animation: '$deal5l 0.6s 0.5s forwards' },
    [theme.breakpoints.only('xs')]: { animation: '$deal5l 0.6s 0.5s forwards' },
  },
  position0Right: {
    [theme.breakpoints.up('sm')]: { animation: '$deal0r 0.6s 0.6s forwards' },
    [theme.breakpoints.only('xs')]: { animation: '$deal0r 0.6s 0.6s forwards' },
  },
  position1Right: {
    [theme.breakpoints.up('sm')]: { animation: '$deal1r 0.6s 0.7s forwards' },
    [theme.breakpoints.only('xs')]: { animation: '$deal1r 0.6s 0.7s forwards' },
  },
  position2Right: {
    [theme.breakpoints.up('sm')]: { animation: '$deal2r 0.6s 0.8s forwards' },
    [theme.breakpoints.only('xs')]: { animation: '$deal2r 0.6s 0.8s forwards' },
  },
  position3Right: {
    [theme.breakpoints.up('sm')]: { animation: '$deal3r 0.6s 0.9s forwards' },
    [theme.breakpoints.only('xs')]: { animation: '$deal3r 0.6s 0.9s forwards' },
  },
  position4Right: {
    [theme.breakpoints.up('sm')]: { animation: '$deal4r 0.6s 1.0s forwards' },
    [theme.breakpoints.only('xs')]: { animation: '$deal4r 0.6s 1.0s forwards' },
  },
  position5Right: {
    [theme.breakpoints.up('sm')]: { animation: '$deal5r 0.6s 1.1s forwards' },
    [theme.breakpoints.only('xs')]: { animation: '$deal5r 0.6s 1.1s forwards' },
  },
  show0Left: {
    [theme.breakpoints.up('sm')]: { animation: '$show0l 0.6s 0.0s forwards' },
    [theme.breakpoints.only('xs')]: { animation: '$show0l 0.6s 0.0s forwards' },
  },
  show1Left: {
    [theme.breakpoints.up('sm')]: { animation: '$show1l 0.6s 0.0s forwards' },
    [theme.breakpoints.only('xs')]: { animation: '$show1l 0.6s 0.0s forwards' },
  },
  show2Left: {
    [theme.breakpoints.up('sm')]: { animation: '$show2l 0.6s 0.0s forwards' },
    [theme.breakpoints.only('xs')]: { animation: '$show2l 0.6s 0.0s forwards' },
  },
  show3Left: {
    [theme.breakpoints.up('sm')]: { animation: '$show3l 0.6s 0.0s forwards' },
    [theme.breakpoints.only('xs')]: { animation: '$show3l 0.6s 0.0s forwards' },
  },
  show4Left: {
    [theme.breakpoints.up('sm')]: { animation: '$show4l 0.6s 0.0s forwards' },
    [theme.breakpoints.only('xs')]: { animation: '$show4l 0.6s 0.0s forwards' },
  },
  show5Left: {
    [theme.breakpoints.up('sm')]: { animation: '$show5l 0.6s 0.0s forwards' },
    [theme.breakpoints.only('xs')]: { animation: '$show5l 0.6s 0.0s forwards' },
  },
  show0Right: {
    [theme.breakpoints.up('sm')]: { animation: '$show0r 0.6s 0.0s forwards' },
    [theme.breakpoints.only('xs')]: { animation: '$show0r 0.6s 0.0s forwards' },
  },
  show1Right: {
    [theme.breakpoints.up('sm')]: { animation: '$show1r 0.6s 0.0s forwards' },
    [theme.breakpoints.only('xs')]: { animation: '$show1r 0.6s 0.0s forwards' },
  },
  show2Right: {
    [theme.breakpoints.up('sm')]: { animation: '$show2r 0.6s 0.0s forwards' },
    [theme.breakpoints.only('xs')]: { animation: '$show2r 0.6s 0.0s forwards' },
  },
  show3Right: {
    [theme.breakpoints.up('sm')]: { animation: '$show3r 0.6s 0.0s forwards' },
    [theme.breakpoints.only('xs')]: { animation: '$show3r 0.6s 0.0s forwards' },
  },
  show4Right: {
    [theme.breakpoints.up('sm')]: { animation: '$show4r 0.6s 0.0s forwards' },
    [theme.breakpoints.only('xs')]: { animation: '$show4r 0.6s 0.0s forwards' },
  },
  show5Right: {
    [theme.breakpoints.up('sm')]: { animation: '$show5r 0.6s 0.0s forwards' },
    [theme.breakpoints.only('xs')]: { animation: '$show5r 0.6s 0.0s forwards' },
  },
  muck0Left: {
    [theme.breakpoints.up('sm')]: { animation: '$muck0l 0.6s 0.0s forwards' },
    [theme.breakpoints.only('xs')]: { animation: '$muck0l 0.6s 0.0s forwards' },
  },
  muck1Left: {
    [theme.breakpoints.up('sm')]: { animation: '$muck1l 0.6s 0.0s forwards' },
    [theme.breakpoints.only('xs')]: { animation: '$muck1l 0.6s 0.0s forwards' },
  },
  muck2Left: {
    [theme.breakpoints.up('sm')]: { animation: '$muck2l 0.6s 0.0s forwards' },
    [theme.breakpoints.only('xs')]: { animation: '$muck2l 0.6s 0.0s forwards' },
  },
  muck3Left: {
    [theme.breakpoints.up('sm')]: { animation: '$muck3l 0.6s 0.0s forwards' },
    [theme.breakpoints.only('xs')]: { animation: '$muck3l 0.6s 0.0s forwards' },
  },
  muck4Left: {
    [theme.breakpoints.up('sm')]: { animation: '$muck4l 0.6s 0.0s forwards' },
    [theme.breakpoints.only('xs')]: { animation: '$muck4l 0.6s 0.0s forwards' },
  },
  muck5Left: {
    [theme.breakpoints.up('sm')]: { animation: '$muck5l 0.6s 0.0s forwards' },
    [theme.breakpoints.only('xs')]: { animation: '$muck5l 0.6s 0.0s forwards' },
  },
  muck0Right: {
    [theme.breakpoints.up('sm')]: { animation: '$muck0r 0.6s 0.0s forwards' },
    [theme.breakpoints.only('xs')]: { animation: '$muck0r 0.6s 0.0s forwards' },
  },
  muck1Right: {
    [theme.breakpoints.up('sm')]: { animation: '$muck1r 0.6s 0.0s forwards' },
    [theme.breakpoints.only('xs')]: { animation: '$muck1r 0.6s 0.0s forwards' },
  },
  muck2Right: {
    [theme.breakpoints.up('sm')]: { animation: '$muck2r 0.6s 0.0s forwards' },
    [theme.breakpoints.only('xs')]: { animation: '$muck2r 0.6s 0.0s forwards' },
  },
  muck3Right: {
    [theme.breakpoints.up('sm')]: { animation: '$muck3r 0.6s 0.0s forwards' },
    [theme.breakpoints.only('xs')]: { animation: '$muck3r 0.6s 0.0s forwards' },
  },
  muck4Right: {
    [theme.breakpoints.up('sm')]: { animation: '$muck4r 0.6s 0.0s forwards' },
    [theme.breakpoints.only('xs')]: { animation: '$muck4r 0.6s 0.0s forwards' },
  },
  muck5Right: {
    [theme.breakpoints.up('sm')]: { animation: '$muck5r 0.6s 0.0s forwards' },
    [theme.breakpoints.only('xs')]: { animation: '$muck5r 0.6s 0.0s forwards' },
  },
});

export default makeStyles(styles);
