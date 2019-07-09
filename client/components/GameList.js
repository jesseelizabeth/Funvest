import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class GameList extends Component {
  render() {
    const { game } = this.props;
    return (
      <div className="row card-panel">
        <Link to={`/games/${game.gameId}`}>
          <div className="col l6">{game.game.name}</div>
          <div className="col l6">${game.balance}</div>
        </Link>
      </div>
    );
  }
}

export default GameList;
