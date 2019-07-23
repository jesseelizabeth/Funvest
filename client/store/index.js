import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import user from './user';
import portfolio from './portfolio';
import stockQuote from './stockQuote';
import mostActive from './mostActive';
import games from './games';
import game from './game';
import player from './player';
import news from './news';
import players from './players';

const reducer = combineReducers({
  user,
  portfolio,
  stockQuote,
  mostActive,
  games,
  game,
  player,
  news,
  players,
});
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const store = createStore(reducer, middleware);

export default store;
