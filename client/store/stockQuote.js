import axios from 'axios';
import token from '../../secrets';

// action types
const GET_QUOTE = 'GET_QUOTE';

// action creators
const gotQuote = quote => ({
  type: GET_QUOTE,
  quote,
});

// thunk
export const getQuote = ticker => async dispatch => {
  const { data } = await axios.get(
    `https://cloud.iexapis.com/v1/stock/${ticker}/quote?displayPercent=true&token=${
      token.token
    }`
  );
  dispatch(gotQuote(data));
};

// initial state
const initialState = {};

// reducer
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_QUOTE:
      return action.quote;
    default:
      return state;
  }
}
