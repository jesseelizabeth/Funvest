import React, { Component } from 'react';

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
            <tr
              key={player.id}
              className={
                player.user.id === user.id
                  ? 'bold teal-text text-accent-3'
                  : null
              }
            >
              <td>{player.user.firstName}</td>
              <td className="right-align">${player.balance}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

export default Leaderboard;
