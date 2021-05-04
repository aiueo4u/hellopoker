import { makeStyles } from '@material-ui/core/styles';

interface IStyles {
  [key: string]: any;
}

export const useStyles = makeStyles(
  (): IStyles => ({
    '@keyframes flopStep1': {
      '0%': { top: 'calc(50% - 100px)', transform: 'translate(-50%, -50%)', visibility: 'visible' },
      '100%': { top: '50%', transform: 'translate(-250%, -50%)', visibility: 'visible' },
    },
    '@keyframes card0': {
      '0%': { transform: 'translate(-250%, -50%)' },
      '100%': { transform: 'translate(-250%, -50%)' },
    },
    '@keyframes card1': {
      '0%': { transform: 'translate(-250%, -50%)' },
      '100%': { transform: 'translate(-150%, -50%)' },
    },
    '@keyframes card2': {
      '0%': { transform: 'translate(-250%, -50%)' },
      '100%': { transform: 'translate(-50%, -50%)' },
    },
    '@keyframes card3': {
      '0%': { top: 'calc(50% - 100px)', transform: 'translate(-50%, -50%)', visibility: 'visible' },
      '100%': { top: '50%', transform: 'translate(50%, -50%)', visibility: 'visible' },
    },
    '@keyframes card4': {
      '0%': { top: 'calc(50% - 100px)', transform: 'translate(-50%, -50%)', visibility: 'visible' },
      '100%': { top: '50%', transform: 'translate(150%, -50%)', visibility: 'visible' },
    },
    card: {
      position: 'absolute',
      top: 'calc(50% - 100px)',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      visibility: 'hidden',
    },
    card0: { animation: '$flopStep1 0.5s 0s forwards, $card0 0.5s 0.5s forwards' },
    card1: { animation: '$flopStep1 0.5s 0s forwards, $card1 0.5s 0.5s forwards' },
    card2: { animation: '$flopStep1 0.5s 0s forwards, $card2 0.5s 0.5s forwards' },
    card3: { animation: '$card3 0.5s forwards' },
    card4: { animation: '$card4 0.5s forwards' },
    card0Animated: { top: '50%', left: '50%', transform: 'translate(-250%, -50%)', visibility: 'visible' },
    card1Animated: { top: '50%', left: '50%', transform: 'translate(-150%, -50%)', visibility: 'visible' },
    card2Animated: { top: '50%', left: '50%', transform: 'translate(-50%, -50%)', visibility: 'visible' },
    card3Animated: { top: '50%', left: '50%', transform: 'translate(50%, -50%)', visibility: 'visible' },
    card4Animated: { top: '50%', left: '50%', transform: 'translate(150%, -50%)', visibility: 'visible' },
  })
);
