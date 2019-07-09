import React, { Component } from 'react';
import { connect } from 'react-redux';
import { clearPlayer } from '../store/player';
import { addPlayer } from '../store/game';

class Player extends Component {
  constructor() {
    super();
    this.add = this.add.bind(this);
  }
  async add(userEmail) {
    const { gameId } = this.props.game;
    await this.props.addPlayer(gameId, userEmail);
    this.props.clearPlayer();
  }
  render() {
    const { player } = this.props;
    return (
      <div>
        <div className="collection">
          <div className="collection-item">
            <div className="col">{player.firstName}</div>
            <div className="col">{player.lastName}</div>

            <button
              className="teal accent-3 btn-small"
              type="button"
              onClick={() => this.add(player.email)}
            >
              Add to Game
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatch = {
  addPlayer,
  clearPlayer,
};

export default connect(
  null,
  mapDispatch
)(Player);
