import React, { Component } from 'react';
import { connect } from 'react-redux';
import { clearPlayer } from '../store/player';
import { addPlayer } from '../store/players';

class Player extends Component {
  constructor() {
    super();
    this.add = this.add.bind(this);
  }
  async add(userEmail) {
    const { id } = this.props.game;
    await this.props.addPlayer(id, userEmail);
    this.props.clearPlayer();
  }
  render() {
    const { player } = this.props;
    return (
      <div>
        <br />
        <div className="divider" />
        <br />
        <div className="row">
          <div className="col bold">
            {player.firstName} {player.lastName}
          </div>
          <i
            className="material-icons teal-text text-accent-3 col right-align"
            onClick={() => this.add(player.email)}
          >
            person_add
          </i>
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
