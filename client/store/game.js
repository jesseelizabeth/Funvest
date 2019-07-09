import axios from 'axios';

// action types
const LOADING_GAME = 'LOADING_GAME';
const GET_GAME = 'GET_GAME';
const GET_PLAYERS = 'GET_PLAYERS';
const ADD_PLAYER = 'ADD_PLAYER';

// action creators
const loading = () => ({
  type: LOADING_GAME,
});

const gotGame = game => ({
  type: GET_GAME,
  game,
});

const gotPlayers = players => ({
  type: GET_PLAYERS,
  players,
});

const addedPlayer = player => ({
  type: ADD_PLAYER,
  player,
});

// thunk
export const getGame = gameId => async dispatch => {
  dispatch(loading());
  const { data } = await axios.get(`/api/games/${gameId}`);
  dispatch(gotGame(data));
};

export const getPlayers = gameId => async dispatch => {
  dispatch(loading());
  const { data } = await axios.get(`/api/players/${gameId}`);
  dispatch(gotPlayers(data));
};

export const addPlayer = (gameId, userEmail) => async dispatch => {
  const { data } = await axios.post(`/api/players/${gameId}/${userEmail}`);
  dispatch(addedPlayer(data));
};

const initialState = {
  selected: {},
  players: [],
  loading: false,
  message: null,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOADING_GAME:
      return { ...state, loading: true };
    case GET_GAME:
      return { ...state, selected: action.game, loading: false };
    case GET_PLAYERS:
      return { ...state, players: action.players, loading: false };
    case ADD_PLAYER: {
      if (action.player === 'Player already exists') {
        return { ...state, message: 'Player already exists' };
      } else {
        return { ...state, players: [...state.players, action.player] };
      }
    }
    default:
      return state;
  }
}
