type Player = {
  id: number;
};

type Message = {
  player: Player;
};

type Payload = {
  message: Message;
};

type Action = {
  type: 'DISMISS_TABLE_MESSAGE' | 'RECEIVE_TABLE_MESSAGE';
  payload: Payload;
};

type State = {
  balloonMessageByPlayerId: any;
  isOpenBalloonByPlayerId: any;
};
const initialState: State = {
  balloonMessageByPlayerId: {},
  isOpenBalloonByPlayerId: {},
} as const;

const reducer = (state: State = initialState, action: Action): State => {
  const { message } = action.payload || {};

  switch (action.type) {
    case 'DISMISS_TABLE_MESSAGE':
      return {
        ...state,
        balloonMessageByPlayerId: {
          ...state.balloonMessageByPlayerId,
          [message.player.id]: '',
        },
        isOpenBalloonByPlayerId: {
          ...state.isOpenBalloonByPlayerId,
          [message.player.id]: false,
        },
      };
    case 'RECEIVE_TABLE_MESSAGE':
      return {
        ...state,
        balloonMessageByPlayerId: {
          ...state.balloonMessageByPlayerId,
          [message.player.id]: message,
        },
        isOpenBalloonByPlayerId: {
          ...state.isOpenBalloonByPlayerId,
          [message.player.id]: true,
        },
      };
    default:
      return state;
  }
};

export default reducer;
