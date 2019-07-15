import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getBalance } from '../store/game';

class LeaderboardList extends Component {
  componentDidMount() {
    const { player } = this.props;
    // this.props.getBalance(player.id);
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

const mapDispatch = {
  getBalance,
};
export default connect(
  null,
  mapDispatch
)(LeaderboardList);
