import usePlayerSessionState from 'hooks/usePlayerSessionState';
import usePlayersState from 'hooks/usePlayersState';

const useWelcomeDialog = () => {
  const { playerId } = usePlayerSessionState();
  const players = usePlayersState();

  const isSeated = players.some(player => player.id === playerId);

  return { isSeated };
};

export default useWelcomeDialog;
