const selectSortedPlayers = (players, currentUserId) => {
  const currentPlayer = players.find(player => player.id === currentUserId);

  let sortedPlayers = [];

  /* 6 MAX */
  for (let i = 0; i < 6; i++) {
    const player = players.find(e => e.seat_no === i + 1);
    if (player) {
      sortedPlayers.push(player);
    } else {
      sortedPlayers.push({ seat_no: i + 1 });
    }
  }
  if (currentPlayer) {
    sortedPlayers = sortedPlayers
      .slice(currentPlayer.seat_no - 1, 10)
      .concat(sortedPlayers.slice(0, currentPlayer.seat_no - 1));
  }

  return sortedPlayers;
};

export default selectSortedPlayers;
