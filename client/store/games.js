import axios from 'axios';

// action types
const GET_GAMES = 'GET_GAMES';
const CREATE_GAME = 'CREATE_GAME';

// action creators
const gotGames = games => ({
  type: GET_GAMES,
  games,
});

const createdGame = game => ({
  type: CREATE_GAME,
  game,
});

// thunk
export const getGames = () => async dispatch => {
  const { data } = await axios.get('/api/games');
  dispatch(gotGames(data));
};

export const createGame = game => async dispatch => {
  const { data } = await axios.post('/api/games', game);
  dispatch(createdGame(data));
};

// initial state
const initialState = {
  all: [],
  loading: false,
};

// reducer
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_GAMES:
      return { ...state, all: action.games };
    case CREATE_GAME:
      return { ...state, all: [...state.all, action.game] };
    default:
      return state;
  }
}
