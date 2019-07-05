import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import {
  Login,
  Signup,
  UserHome,
  StockInfo,
  Transactions,
  Portfolio,
} from './components';
import { me } from './store/user';

class Routes extends Component {
  componentDidMount() {
    this.props.me();
  }
  render() {
    const { isLoggedIn } = this.props;
    return (
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        {isLoggedIn ? (
          <Switch>
            <Route path="/home" component={UserHome} />
            <Route path="/portfolio" component={Portfolio} />
            <Route path="/transactions" component={Transactions} />
          </Switch>
        ) : (
          <Route component={Login} />
        )}
      </Switch>
    );
  }
}

const mapState = state => ({
  isLoggedIn: !!state.user.id,
});

const mapDispatch = dispatch => ({
  me: () => dispatch(me()),
});

export default connect(
  mapState,
  mapDispatch
)(Routes);
