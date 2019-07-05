import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signup, login } from '../store/user';
import AuthForm from './AuthForm';

class Auth extends Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(event) {
    event.preventDefault();
    const method = event.target.name;
    const email = event.target.email.value;
    const password = event.target.password.value;
    if (method === 'signup') {
      const firstName = event.target.firstName.value;
      const lastName = event.target.lastName.value;
      this.props.signup(firstName, lastName, email, password);
    } else {
      this.props.login(email, password);
    }
  }
  render() {
    const { method, displayName, error } = this.props;
    return (
      <AuthForm
        name={method}
        displayName={displayName}
        handleSubmit={() => this.handleSubmit(event)}
        error={error}
      />
    );
  }
}

const mapLogin = state => ({
  method: 'login',
  displayName: 'Login',
  error: state.user.error,
});

const mapSignup = state => ({
  method: 'signup',
  displayName: 'Sign Up',
  error: state.user.error,
});

const mapDispatch = dispatch => ({
  signup: (firstName, lastName, email, password) =>
    dispatch(signup(firstName, lastName, email, password)),
  login: (email, password) => dispatch(login(email, password)),
});

export const Login = connect(
  mapLogin,
  mapDispatch
)(Auth);

export const Signup = connect(
  mapSignup,
  mapDispatch
)(Auth);
