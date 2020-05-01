const initialState = {
  cable: null,
};

const ActionCableReducer = (state = initialState, action) => {
  const payload = action.payload;

  switch (action.type) {
    case 'SETUP_ACTION_CABLE_CONSUMER':
      return { ...state, cable: payload.cable };
    default:
      return state;
  }
};

export default ActionCableReducer;
