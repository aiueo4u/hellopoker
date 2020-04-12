export const roundToReadable = round => {
  switch (round) {
    case 'preflop':
      return 'プリフロップ';
    case 'flop':
      return 'フロップ';
    case 'turn':
      return 'ターン';
    case 'river':
      return 'リバー';
    case 'finished':
      return '終了';
    default:
      return round;
  }
};
