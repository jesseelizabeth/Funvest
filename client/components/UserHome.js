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
        <h6 className="bold center-align">Welcome back, {firstName}!</h6>
        <br />
        <div className="row">
          <div className="card-panel rounded">
            <Games />
          </div>
        </div>
        <div className="row">
          <div className="col l6">
            <div className="card-panel rounded">
              <NewGame />
            </div>
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
