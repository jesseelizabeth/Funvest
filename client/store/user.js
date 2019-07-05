import axios from 'axios';
import history from '../history';

// action types
const GET_USER = 'GET_USER';
const REMOVE_USER = 'REMOVE_USER';

// initial state
const defaultUser = {};

// action creators
const getUser = user => ({
  type: GET_USER,
  user,
});

const removeUser = () => ({
  type: REMOVE_USER,
});

// thunks
export const me = () => async dispatch => {
  try {
    const { data } = await axios.get('/auth/me');
    dispatch(getUser(data || defaultUser));
  } catch (err) {
    console.error(err);
  }
};

export const login = (email, password) => async dispatch => {
  let res;
  try {
    res = await axios.post('/auth/login', {
      email,
      password,
    });
  } catch (error) {
    return dispatch(getUser({ error }));
  }
  try {
    dispatch(getUser(res.data));
    history.push('/home');
  } catch (error) {
    console.error(error);
  }
};

export const signup = (
  firstName,
  lastName,
  email,
  password
) => async dispatch => {
  let res;
  try {
    res = await axios.post('/auth/signup', {
      firstName,
      lastName,
      email,
      password,
    });
  } catch (error) {
    return dispatch(getUser({ error }));
  }

  try {
    dispatch(getUser(res.data));
    history.push('/home');
  } catch (error) {
    console.error(error);
  }
};

export const logout = () => async dispatch => {
  try {
    await axios.post('/auth/logout');
    dispatch(removeUser());
    history.push('/login');
  } catch (err) {
    console.error(err);
  }
};

// reducer
export default function(state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user;
    case REMOVE_USER:
      return defaultUser;
    default:
      return state;
  }
}
