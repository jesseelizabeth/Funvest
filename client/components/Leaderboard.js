import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getPlayers } from '../store/players';
import LeaderboardList from './LeaderboardList';
import LoadingScreen from './LoadingScreen';

class Leaderboard extends Component {
  componentDidMount() {
    const { id } = this.props.game;
    this.props.getPlayers(id);
  }
  render() {
    const { players, user, loading } = this.props;
    if (loading) return <LoadingScreen />;
    return (
      <table className="highlight">
        <thead>
          <tr>
            <th>Leaderboard</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {players.map(player => (
            <LeaderboardList key={player.id} player={player} user={user} />
          ))}
        </tbody>
      </table>
    );
  }
}

const mapState = state => ({
  players: state.players.all,
  loading: state.players.loading,
  user: state.user,
});

const mapDispatch = {
  getPlayers,
};

export default connect(
  mapState,
  mapDispatch
)(Leaderboard);
