import React, { Component } from 'react';
import LeaderboardList from './LeaderboardList';

class Leaderboard extends Component {
  render() {
    const { players, user } = this.props;
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

export default Leaderboard;
