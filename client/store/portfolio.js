import axios from 'axios';

// action types
const LOADING_PORTFOLIO = 'LOADING_PORTFOLIO';
const GET_PORTFOLIO = 'GET_PORTFOLIO';
const TRADE_STOCK = 'TRADE_STOCK';

// action creators
const loadingPortfolio = () => ({
  type: LOADING_PORTFOLIO,
});

const gotPortfolio = portfolio => ({
  type: GET_PORTFOLIO,
  portfolio,
});

const tradedStock = transaction => ({
  type: TRADE_STOCK,
  transaction,
});

// thunk
export const fetchPortfolio = gameId => async dispatch => {
  dispatch(loadingPortfolio());
  const { data } = await axios.get(`/api/games/${gameId}/portfolio`);
  dispatch(gotPortfolio(data));
};

export const tradeStock = (transaction, gameId) => async dispatch => {
  const { data } = await axios.post(
    `/api/games/${gameId}/transactions`,
    transaction
  );
  dispatch(tradedStock(data));
};

// initial state
const initialState = {
  portfolio: {},
  loading: false,
};

// reducer
export default function(state = initialState, action) {
  switch (action.type) {
    case LOADING_PORTFOLIO:
      return { ...state, loading: true };
    case GET_PORTFOLIO:
      return { ...state, portfolio: action.portfolio, loading: false };
    case TRADE_STOCK: {
      let updatedStocks = state.portfolio.stocks.filter(stock => {
        if (stock.symbol === action.transaction.symbol) {
          action.transaction.type === 'buy'
            ? (stock.shares += action.transaction.shares)
            : (stock.shares -= action.transaction.shares);
        }
        return state.stocks;
      });
      return {
        ...state,
        portfolio: {
          ...state.portfolio,
          stocks: updatedStocks,
          transactions: action.transaction,
        },
        loading: false,
      };
    }
    default:
      return state;
  }
}
