import axios from 'axios';
import token from '../../secrets';

// action types
const LOADING = 'LOADING';
const GET_QUOTE = 'GET_QUOTE';
const GET_LOGO = 'GET_LOGO';
const GET_COMPANY_INFO = 'GET_COMPANY_INFO';

// action creators
const gotQuote = quote => ({
  type: GET_QUOTE,
  quote,
});

const loading = () => ({
  type: LOADING,
});

const gotLogo = logo => ({
  type: GET_LOGO,
  logo,
});

const gotCompanyInfo = info => ({
  type: GET_COMPANY_INFO,
  info,
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

export const getLogo = ticker => async dispatch => {
  dispatch(loading());
  const { data } = await axios.get(
    `https://cloud.iexapis.com/v1/stock/${ticker}/logo?token=${token.token}`
  );
  dispatch(gotLogo(data));
};

export const getCompanyInfo = ticker => async dispatch => {
  dispatch(loading());
  const { data } = await axios.get(
    `https://cloud.iexapis.com/v1/stock/${ticker}/company?token=${token.token}`
  );
  dispatch(gotCompanyInfo(data));
};

// initial state
const initialState = {
  quote: {},
  logo: '',
  company: {},
  loading: false,
};

// reducer
export default function(state = initialState, action) {
  switch (action.type) {
    case LOADING:
      return { ...state, loading: true };
    case GET_QUOTE:
      return { ...state, quote: action.quote, loading: false };
    case GET_LOGO:
      return { ...state, logo: action.logo, loading: false };
    case GET_COMPANY_INFO:
      return { ...state, company: action.info, loading: false };
    default:
      return state;
  }
}
