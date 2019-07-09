import axios from 'axios';
import token from '../../secrets';

// action types
const GET_LIST = 'GET_LIST';
const LOADING_LIST = 'LOADING_LIST';

// action creators
const gotList = list => ({
  type: GET_LIST,
  list,
});

const loadingList = () => ({
  type: LOADING_LIST,
});

// thunk
export const getMostActive = () => async dispatch => {
  dispatch(loadingList());
  const { data } = await axios.get(
    `https://cloud.iexapis.com/v1/stock/market/list/mostactive?token=${
      token.token
    }`
  );
  dispatch(gotList(data));
};

// initial state
const initialState = {
  list: [],
  loading: false,
};

// reducer
export default function(state = initialState, action) {
  switch (action.type) {
    case LOADING_LIST:
      return { ...state, loading: true };
    case GET_LIST:
      return { ...state, loading: false, list: action.list };
    default:
      return state;
  }
}
