import { useDispatch } from 'react-redux';
import useGameTableState from 'hooks/useGameTableState';
import usePlayerSessionState from 'hooks/usePlayerSessionState';
import usePlayersState from 'hooks/usePlayersState';

const useBetAction = player => {
  const dispatch = useDispatch();
  const gameTable = useGameTableState();
  const players = usePlayersState();
  const session = usePlayerSessionState();
  const heroPlayer = players.find(player => player.id === session.playerId);

  // 現ラウンド以前のポット（現ラウンドのベット額は含まれない）
  const prevRoundPot = gameTable.pot;

  // 現ラウンドの追加分
  const currentRoundPot = players.reduce((total, player) => total + player.betAmountInState, 0);

  // 現ポット
  const currentPot = prevRoundPot + currentRoundPot;

  // 現ラウンドの自分の追加分
  const currentRoundHeroBetAmount = heroPlayer ? heroPlayer.betAmountInState : 0;

  // 現ラウンドの最高ベット額
  const currentRoundMaxBetAmount = Math.max(...players.map(player => player.betAmountInState));

  //console.log(players.map(player => player.betAmountInState), currentRoundMaxBetAmount);

  const currentRoundSecondMaxBetAmount = Math.max(
    ...players.map(player => player.betAmountInState).filter(amount => amount !== currentRoundMaxBetAmount),
    0
  );

  // 必要コール額
  const amountToCall = currentRoundMaxBetAmount - currentRoundHeroBetAmount;

  //console.log(currentRoundMaxBetAmount, currentRoundSecondMaxBetAmount);

  // 現ラウンドの最高ベット額のレイズ額
  const prevRaiseAmount = Math.max(currentRoundMaxBetAmount - currentRoundSecondMaxBetAmount, gameTable.table.bbSize);

  //console.log(amountToCall, prevRaiseAmount);

  // ミニマムベット（レイズ）額
  const minimumBetAmount = amountToCall + prevRaiseAmount;

  const oneThirdPotAmount = amountToCall + parseInt((currentPot + amountToCall) / 3);

  const allinBetAmount = () => {
    dispatch({
      type: 'SET_BET_SIZE',
      playerId: player.id,
      playerStack: player.stack,
      amount: player.stack,
    });
  };

  const setBetAmount = amount => {
    dispatch({
      type: 'SET_BET_SIZE',
      playerId: player.id,
      playerStack: player.stack,
      amount,
    });
  };

  const potBetAmount = ratio => {
    const amount = amountToCall + parseInt((currentPot + amountToCall) * ratio);
    dispatch({
      type: 'SET_BET_SIZE',
      playerId: player.id,
      playerStack: player.stack,
      amount,
    });
  };

  const increment = amount => {
    dispatch({
      type: 'INCREMENT_BET_SIZE',
      playerId: player.id,
      playerStack: player.stack,
      amount,
    });
  };

  return { allinBetAmount, increment, potBetAmount, minimumBetAmount, oneThirdPotAmount, setBetAmount };
};

export default useBetAction;
