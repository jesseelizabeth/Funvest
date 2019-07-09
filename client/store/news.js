import axios from 'axios';
import token from '../../secrets';

// action types
const GET_NEWS = 'GET_NEWS';
const LOADING_NEWS = 'LOADING_NEWS';

// action creators
const gotNews = news => ({
  type: GET_NEWS,
  news,
});

const loadingNews = () => ({
  type: LOADING_NEWS,
});

// thunk
export const fetchNews = symbol => async dispatch => {
  dispatch(loadingNews());
  const { data } = await axios.get(
    `https://cloud.iexapis.com/v1/stock/${symbol}/news?token=${token.token}`
  );
  dispatch(gotNews(data));
};

// initial state
const initialState = {
  all: [],
  loading: false,
};

// reducer
export default function(state = initialState, action) {
  switch (action.type) {
    case LOADING_NEWS:
      return { ...state, loading: true };
    case GET_NEWS:
      return { ...state, loading: false, all: action.news };
    default:
      return state;
  }
}
