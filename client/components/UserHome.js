import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getGames } from '../store/games';
import Games from './Games';
import NewGame from './NewGame';

class UserHome extends Component {
  componentDidMount() {
    this.props.getGames();
  }
  render() {
    const { firstName } = this.props;
    return (
      <div className="container center-align">
        <h5>Welcome back, {firstName}!</h5>
        <div className="row">
          <div className="col m6 offset-m3 l5 offset-l1">
            <NewGame />
          </div>
          <div className="col m6 offset-m3 l5 offset-l1">
            <Games />
          </div>
        </div>
      </div>
    );
  }
}

const mapState = state => ({
  firstName: state.user.firstName,
});

const mapDispatch = dispatch => ({
  getGames: () => dispatch(getGames()),
});

export default connect(
  mapState,
  mapDispatch
)(UserHome);
