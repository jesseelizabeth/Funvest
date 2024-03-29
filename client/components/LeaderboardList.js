import React, { Component } from 'react';

class LeaderboardList extends Component {
  render() {
    const { player, user } = this.props;

    return (
      // <LeaderboardPlayer player={player} user={user} portfolio={portfolio} />
      <div
        key={player.id}
        className={
          player.user.id === user.id ? 'bold teal-text text-accent-3' : null
        }
      >
        <td>{player.user.firstName}</td>
        <td className="right-align">${player.balance}</td>
      </div>
    );
  }
}

export default LeaderboardList;
