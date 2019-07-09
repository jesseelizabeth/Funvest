import axios from 'axios';

// action types
const LOADING_PORTFOLIO = 'LOADING_PORTFOLIO';
const GET_PORTFOLIO = 'GET_PORTFOLIO';

const LOADING_TRANSACTIONS = 'LOADING_TRANSACTIONS';
const FETCH_TRANSACTIONS = 'FETCH_TRANSACTIONS';
const TRADE_STOCK = 'TRADE_STOCK';

// action creators
const loadingPortfolio = () => ({
  type: LOADING_PORTFOLIO,
});

const gotPortfolio = portfolio => ({
  type: GET_PORTFOLIO,
  portfolio,
});

const loadingTransactions = () => ({
  type: LOADING_TRANSACTIONS,
});

const gotTransactions = transactions => ({
  type: FETCH_TRANSACTIONS,
  transactions,
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

export const fetchTransactions = gameId => async dispatch => {
  dispatch(loadingTransactions());
  const { data } = await axios.get(`/api/games/${gameId}/transactions`);
  dispatch(gotTransactions(data));
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
  stocks: [],
  transactions: [],
  loading: false,
};

// reducer
export default function(state = initialState, action) {
  switch (action.type) {
    case LOADING_PORTFOLIO:
      return { ...state, loading: true };
    case GET_PORTFOLIO:
      return { ...state, stocks: action.portfolio, loading: false };
    case LOADING_TRANSACTIONS:
      return { ...state, loading: true };
    case FETCH_TRANSACTIONS:
      return { ...state, transactions: action.transactions, loading: false };
    case TRADE_STOCK: {
      let updatedStocks = state.stocks.filter(stock => {
        if (stock.symbol === action.transaction.symbol) {
          action.transaction.type === 'buy'
            ? (stock.shares += action.transaction.shares)
            : (stock.shares -= action.transaction.shares);
        }
        return state.stocks;
      });
      return {
        ...state,
        stocks: updatedStocks,
        transactions: [...state.transactions, action.transaction],
        loading: false,
      };
    }
    default:
      return state;
  }
}
