type Payload = {
  cable: any;
};

export type ActionCableState = {
  cable: any;
};

type Action = {
  type: 'SETUP_ACTION_CABLE_CONSUMER';
  payload: Payload;
};

const initialState: ActionCableState = {
  cable: null,
} as const;

const ActionCableReducer = (state: ActionCableState = initialState, action: Action): ActionCableState => {
  const { payload } = action;

  switch (action.type) {
    case 'SETUP_ACTION_CABLE_CONSUMER':
      return { ...state, cable: payload.cable };
    default:
      return state;
  }
};

export default ActionCableReducer;
