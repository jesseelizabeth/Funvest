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
      <div className="container">
        <h5 className="center-align">Welcome back, {firstName}!</h5>
        <div className="row">
          <div className="col l8 m12">
            <Games />
          </div>
          <div className="col l3 offset-l1 m12">
            <NewGame />
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
