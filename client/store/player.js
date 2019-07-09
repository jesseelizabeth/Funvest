import axios from 'axios';

// action types
const LOADING_PLAYER = 'LOADING_PLAYER';
const SEARCH_PLAYER = 'SEARCH_PLAYER';
const CLEAR_PLAYER = 'CLEAR_PLAYER';

// action creators
const loading = () => ({
  type: LOADING_PLAYER,
});

const gotPlayer = player => ({
  type: SEARCH_PLAYER,
  player,
});

export const clearPlayer = () => ({
  type: CLEAR_PLAYER,
});

// thunk
export const searchPlayer = userEmail => async dispatch => {
  dispatch(loading());
  const { data } = await axios.get(`/api/user/${userEmail}`);
  dispatch(gotPlayer(data));
};

const initialState = {
  selected: undefined,
  loading: false,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOADING_PLAYER:
      return { ...state, loading: true };
    case SEARCH_PLAYER:
      return { ...state, selected: action.player, loading: false };
    case CLEAR_PLAYER:
      return { ...state, selected: undefined };
    default:
      return state;
  }
}
