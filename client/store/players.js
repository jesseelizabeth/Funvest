import axios from 'axios';

// action types
const LOADING_PLAYERS = 'LOADING_PLAYERS';
const GET_PLAYERS = 'GET_PLAYERS';
const ADD_PLAYER = 'ADD_PLAYER';

// action creators
const loadingPlayers = () => ({
  type: LOADING_PLAYERS,
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
export const getPlayers = gameId => async dispatch => {
  dispatch(loadingPlayers);
  const { data } = await axios.get(`/api/games/${gameId}/portfolios`);
  dispatch(gotPlayers(data));
};

export const addPlayer = (gameId, userEmail) => async dispatch => {
  const { data } = await axios.post(`/api/games/${gameId}/${userEmail}`);
  dispatch(addedPlayer(data));
};

const initialState = {
  all: [],
  loading: false,
  message: null,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOADING_PLAYERS:
      return { ...state, loading: true };
    case GET_PLAYERS:
      return { ...state, all: action.players, loading: false };
    case ADD_PLAYER: {
      if (action.player === 'Player already exists') {
        return { ...state, message: action.player };
      } else {
        return { ...state, all: [...state.all, action.player] };
      }
    }
    default:
      return state;
  }
}
