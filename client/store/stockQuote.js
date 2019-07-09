import axios from 'axios';
import token from '../../secrets';

// action types
const LOADING = 'LOADING';
const GET_QUOTE = 'GET_QUOTE';

// action creators
const gotQuote = quote => ({
  type: GET_QUOTE,
  quote,
});

const loading = () => ({
  type: LOADING,
});

// thunk
export const getQuote = ticker => async dispatch => {
  dispatch(loading());
  const { data } = await axios.get(
    `https://cloud.iexapis.com/v1/stock/${ticker}/quote?displayPercent=true&token=${
      token.token
    }`
  );
  dispatch(gotQuote(data));
};

// initial state
const initialState = {
  quote: {},
  loading: false,
};

// reducer
export default function(state = initialState, action) {
  switch (action.type) {
    case LOADING:
      return { ...state, loading: true };
    case GET_QUOTE:
      return { ...state, quote: action.quote, loading: false };
    default:
      return state;
  }
}
