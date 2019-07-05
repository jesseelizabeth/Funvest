import React, { Component } from 'react';
import { connect } from 'react-redux';
import Search from './Search';
import { getBalance } from '../store/portfolio';

class UserHome extends Component {
  componentDidMount() {
    this.props.getBalance();
  }
  render() {
    const { firstName, balance } = this.props;
    return (
      <div className="center-align">
        <h5>Welcome back, {firstName}!</h5>
        <p>Current balance: ${balance}</p>
        <Search />
      </div>
    );
  }
}

const mapState = state => ({
  firstName: state.user.firstName,
  balance: state.portfolio.balance,
});

const mapDispatch = dispatch => ({
  getBalance: () => dispatch(getBalance()),
});

export default connect(
  mapState,
  mapDispatch
)(UserHome);
