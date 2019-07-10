import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class GameList extends Component {
  render() {
    const { game } = this.props;
    return (
      <div>
        <br />
        <div className="row">
          <Link
            to={{
              pathname: `/games/${game.gameId}`,
              state: { gameName: game.game.name },
            }}
          >
            <h6 className="col l6 black-text">
              {game.game.name.toUpperCase()}
            </h6>
            <h6 className="col l6 black-text right-align">${game.balance}</h6>
          </Link>
        </div>
        <div className="divider" />
      </div>
    );
  }
}

export default GameList;
