import React, { Component } from 'react';

class LeaderboardPlayer extends Component {
  componentDidMount() {
    const { portfolio } = this.props;
    console.log('PORT', portfolio.stocks);
    let value;
    portfolio.stocks.map(stock => {
      value += stock.totalValue;
    });
    console.log('VALUE', value);
  }
  render() {
    const { player, user } = this.props;
    return (
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

export default LeaderboardPlayer;
