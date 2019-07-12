import React, { Component } from 'react';
import { connect } from 'react-redux';
import { searchPlayer, clearPlayer } from '../store/player';
import { addPlayer } from '../store/game';
import LoadingScreen from './LoadingScreen';
import Player from './Player';

class AddPlayers extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    this.setState({ email: event.target.value });
  }
  async handleSubmit() {
    const { email } = this.state;
    await this.props.searchPlayer(email);
    if (this.props.player === null) {
      M.toast({ html: 'No user with this email' });
    }
    this.setState({ email: '' });
  }

  render() {
    const { player, loading, game } = this.props;
    if (loading) return <LoadingScreen />;

    return (
      <div>
        <h6 className="bold">Add Players</h6>
        <div className="row">
          <div className="col l6 center-align">
            <input
              type="text"
              value={this.state.email}
              onChange={this.handleChange}
              placeholder="Email"
            />
          </div>
        </div>
        <button
          className="teal accent-3 btn-flat"
          type="button"
          onClick={this.handleSubmit}
        >
          Search
        </button>

        {player ? (
          <div>
            <Player player={player} game={game} />
          </div>
        ) : null}
      </div>
    );
  }
}

const mapState = state => ({
  player: state.player.selected,
  loading: state.player.loading,
  game: state.game.selected,
});

const mapDispatch = {
  searchPlayer,
  addPlayer,
  clearPlayer,
};

export default connect(
  mapState,
  mapDispatch
)(AddPlayers);
