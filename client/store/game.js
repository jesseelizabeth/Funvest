import axios from 'axios';
import { totalCost, fetchPrices } from '../../utils';

// action types
const LOADING_GAME = 'LOADING_GAME';
const GET_GAME = 'GET_GAME';
const GET_PLAYERS = 'GET_PLAYERS';
const ADD_PLAYER = 'ADD_PLAYER';
const GET_BALANCE = 'GET_BALANCE';

// action creators
const loading = () => ({
  type: LOADING_GAME,
});

const gotGame = game => ({
  type: GET_GAME,
  game,
});

const gotPlayers = players => ({
  type: GET_PLAYERS,
  players,
});

const addedPlayer = player => ({
  type: ADD_PLAYER,
  player,
});

const gotBalance = player => ({
  type: GET_BALANCE,
  player,
});

// thunk
export const getGame = gameId => async dispatch => {
  dispatch(loading());
  const { data } = await axios.get(`/api/games/${gameId}`);
  dispatch(gotGame(data));
};

export const getPlayers = gameId => async dispatch => {
  dispatch(loading());
  const { data } = await axios.get(`/api/players/${gameId}`);
  dispatch(gotPlayers(data));
};

export const addPlayer = (gameId, userEmail) => async dispatch => {
  const { data } = await axios.post(`/api/players/${gameId}/${userEmail}`);
  dispatch(addedPlayer(data));
};

export const getBalance = playerId => async dispatch => {
  dispatch(loading());
  const { data } = await axios.get(`/api/players/${playerId}/balance`);
  dispatch(gotBalance(data));
};

const initialState = {
  selected: {},
  players: [],
  loading: false,
  message: null,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOADING_GAME:
      return { ...state, loading: true };
    case GET_GAME:
      return { ...state, selected: action.game, loading: false };
    case GET_PLAYERS:
      return { ...state, players: action.players, loading: false };
    case ADD_PLAYER: {
      if (action.player === 'Player already exists') {
        return { ...state, message: 'Player already exists' };
      } else {
        return { ...state, players: [...state.players, action.player] };
      }
    }
    case GET_BALANCE: {
      // const { transactions, stocks } = action.player;
      // const costs = totalCost(transactions);
      // stocks.map(stock => fetchPrices(stock));
      console.log('SUPPPPPP', action.player);
      return state;
    }
    default:
      return state;
  }
}
