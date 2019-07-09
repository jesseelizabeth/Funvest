import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import {
  Login,
  Signup,
  UserHome,
  StockInfo,
  GameDashboard,
  StockDashboard,
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
            <Route path="/quote/:symbol" component={StockDashboard} />
            <Route path="/games/:id" component={GameDashboard} />
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
