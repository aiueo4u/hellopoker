export const dealtCardsReceived = data => {
  const { cards, player_id } = data;
  return {
    type: 'DEALT_CARD_RECEIVED',
    cards,
    playerId: player_id,
  };
};

export const gameHandActionReceived = (pot, players) => {
  return { type: 'GAME_HAND_ACTION_RECEIVED', pot, players };
};

export const gameHandFinishedReceived = () => {
  return { type: 'GAME_HAND_FINISHED_RECEIVED' };
};

export const playerActionReceived = data => {
  const {
    pot,
    game_hand_state,
    players,
    current_seat_no,
    button_seat_no,
    last_aggressive_seat_no,
    undoable,
    game_hand_count,
    board_cards,
    show_or_muck,
    reached_rounds,
    reaching_rounds,
    last_action,
    just_actioned,
    table_id,
  } = data;

  return {
    type: 'BEFORE_PLAYER_ACTION_RECEIVED',
    pot,
    gameHandState: game_hand_state,
    round: game_hand_state, // TODO,
    currentSeatNo: current_seat_no,
    players,
    buttonSeatNo: button_seat_no,
    lastAggressiveSeatNo: last_aggressive_seat_no,
    undoable,
    gameHandCount: game_hand_count,
    boardCards: board_cards,
    showOrMuck: show_or_muck,
    reachedRounds: reached_rounds,
    lastAction: last_action,
    reachingRounds: reaching_rounds,
    justActioned: just_actioned,
    tableId: table_id,
  };
};
