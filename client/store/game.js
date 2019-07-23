import axios from 'axios';

// action types
const LOADING_GAME = 'LOADING_GAME';
const GET_GAME = 'GET_GAME';

// action creators
const loadingGame = () => ({
  type: LOADING_GAME,
});

const gotGame = game => ({
  type: GET_GAME,
  game,
});

// thunk
export const getGame = gameId => async dispatch => {
  dispatch(loadingGame());
  const { data } = await axios.get(`/api/games/${gameId}`);
  dispatch(gotGame(data));
};

const initialState = {
  selected: {},
  loading: false,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOADING_GAME:
      return { ...state, loading: true };
    case GET_GAME:
      return { ...state, selected: action.game, loading: false };
    default:
      return state;
  }
}
