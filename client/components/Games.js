import React, { Component } from 'react';
import { connect } from 'react-redux';
import GameList from './GameList';

class Games extends Component {
  render() {
    const { games } = this.props;
    return (
      <div>
        <h6 className="bold center-align">Game Center</h6>
        {games.map(game => (
          <GameList key={game.id} game={game} />
        ))}
      </div>
    );
  }
}

const mapState = state => ({
  games: state.games.all,
});

export default connect(mapState)(Games);
