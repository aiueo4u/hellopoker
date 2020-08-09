import axios from 'axios';

const ApiClient = axios.create({
  baseURL: '/api',
  headers: {
    Accept: 'application/json',
  },
  withCredentials: true,
});

ApiClient.interceptors.response.use(response => {
  const prevClientVersion = localStorage.getItem('current-client-version');
  const currentClientVersion = response.headers['current-client-version'];
  localStorage.setItem('current-client-version', currentClientVersion);

  if (prevClientVersion && prevClientVersion !== currentClientVersion) {
    window.location.reload(); // TODO: ここでリロード？
  }
  return response;
});

export const createTournament = data => {
  const body = new FormData();
  Object.keys(data).map(key => body.append(key, data[key]));
  return ApiClient.post('tournaments', body);
};

export const fetchTableMessages = tableId => ApiClient.get(`/tables/${tableId}/table_messages`);
export const fetchTournament = id => ApiClient.get(`/tournaments/${id}`);
export const fetchTournaments = () => ApiClient.get(`/tournaments`);
export const postTest = data => {
  const body = new FormData();
  Object.keys(data).map(key => body.append(key, data[key]));
  return ApiClient.post('tests', body);
};

export const takeSeatToGameDealer = (tableId, playerId, seatNo, buyInAmount) => {
  const body = new FormData();
  body.append('type', 'PLAYER_ACTION_TAKE_SEAT');
  body.append('table_id', tableId);
  body.append('player_id', playerId);
  body.append('seat_no', seatNo);
  body.append('buy_in_amount', buyInAmount);
  return ApiClient.post('/game_dealer/take_seat', body);
};

export const addNpcPlayer = (tableId, seatNo) => {
  const body = new FormData();
  body.append('type', 'PLAYER_ACTION_TAKE_SEAT');
  body.append('table_id', tableId);
  body.append('seat_no', seatNo);
  return ApiClient.post('/game_dealer/add_npc_player', body);
};

export const actionToGameDealer = (type, tableId, amount = null) => {
  const body = new FormData();
  body.append('type', type);
  body.append('table_id', tableId);
  if (amount) body.append('amount', amount);
  return ApiClient.post('/game_dealer', body);
};

export const startToGameDealer = tableId => {
  const body = new FormData();
  body.append('table_id', tableId);
  return ApiClient.post('/game_dealer/start', body);
};

export const createTable = form => {
  const { name, sb, bb } = form;

  const body = new FormData();
  body.append('table[name]', name);
  body.append('table[sb_size]', sb);
  body.append('table[bb_size]', bb);
  return ApiClient.post(`/tables`, body);
};

export const createTableMessage = (tableId, form) => {
  const { content } = form;

  const body = new FormData();
  body.append('content', content);
  return ApiClient.post(`/tables/${tableId}/table_messages`, body);
};

export const debugLogin = ({ name }) => {
  const body = new FormData();
  body.append('nickname', name);
  return ApiClient.post(`/session`, body);
};

export const fetchCurrentUser = () => ApiClient.get(`/players/@me`);
export const fetchTables = () => ApiClient.get(`/tables`);

export const logout = () => ApiClient.delete(`/session`);
export const retryNpcPlayerAction = body => ApiClient.post(`/game_dealer/retry_npc_player_action`, body);
export const startTournament = id => ApiClient.post(`/tournaments/${id}/start`);
