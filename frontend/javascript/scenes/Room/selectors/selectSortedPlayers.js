const selectSortedPlayers = (players, currentUserId) => {
  const currentPlayer = players.find(player => player.id === currentUserId);

  let sortedPlayers = [];

  /* 6 MAX */
  for (let i = 0; i < 6; i++) {
    const player = players.find(e => e.seatNo === i + 1);
    if (player) {
      sortedPlayers.push(player);
    } else {
      sortedPlayers.push({ seatNo: i + 1 });
    }
  }
  if (currentPlayer) {
    sortedPlayers = sortedPlayers
      .slice(currentPlayer.seatNo - 1, 10)
      .concat(sortedPlayers.slice(0, currentPlayer.seatNo - 1));
  }

  return sortedPlayers;
};

export default selectSortedPlayers;
