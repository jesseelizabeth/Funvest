import axios from 'axios';

// action types
const LOADING_PORTFOLIO = 'LOADING_PORTFOLIO';
const GET_STOCKS = 'GET_STOCKS';
const GET_BALANCE = 'GET_BALANCE';

// action creators
const loadingPortfolio = () => ({
  type: LOADING_PORTFOLIO,
});

const gotStocks = stocks => ({
  type: GET_STOCKS,
  stocks,
});

const gotBalance = balance => ({
  type: GET_BALANCE,
  balance,
});

// thunk
export const fetchPortfolio = () => async dispatch => {
  dispatch(loadingPortfolio());
  const { data } = await axios.get('/api/portfolio');
  dispatch(gotStocks(data));
};

export const getBalance = () => async dispatch => {
  const { data } = await axios.get('/api/users/balance');
  dispatch(gotBalance(data));
};

// initial state
const initialState = {
  stocks: [],
  balance: null,
  loading: false,
};

// reducer
export default function(state = initialState, action) {
  switch (action.type) {
    case LOADING_PORTFOLIO:
      return { ...state, loading: true };
    case GET_STOCKS:
      return { ...state, stocks: action.stocks, loading: false };
    case GET_BALANCE:
      return { ...state, balance: action.balance };
    default:
      return state;
  }
}
