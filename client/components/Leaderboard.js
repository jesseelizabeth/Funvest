import React, { Component } from 'react';

class Leaderboard extends Component {
  render() {
    const { players } = this.props;
    return (
      <table className="highlight">
        <thead>
          <tr>
            <th>Name</th>
            <th>Balance</th>
          </tr>
        </thead>
        <tbody>
          {players.map(player => (
            <tr key={player.id}>
              <td>{player.user.firstName}</td>
              <td>${player.balance}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

export default Leaderboard;
