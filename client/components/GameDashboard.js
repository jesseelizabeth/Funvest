import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getPlayers, getGame } from '../store/game';
import { fetchPortfolio, fetchTransactions } from '../store/portfolio';
import LoadingScreen from './LoadingScreen';
import Leaderboard from './Leaderboard';
import Transactions from './Transactions';
import Portfolio from './Portfolio';
import Search from './Search';
import AddPlayers from './AddPlayers';

class GameDashboard extends Component {
  constructor() {
    super();
    this.state = {
      active: 'portfolio',
      portfolioColor: 'blue-text',
      transactionsColor: 'black-text',
    };
    this.handleClick = this.handleClick.bind(this);
  }
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.getPlayers(id);
    this.props.getGame(id);
    this.props.fetchPortfolio(id);
    this.props.fetchTransactions(id);
  }
  handleClick(active) {
    if (active === 'portfolio') {
      this.setState({
        active,
        portfolioColor: 'blue-text',
        transactionsColor: 'black-text',
      });
    } else {
      this.setState({
        active,
        portfolioColor: 'black-text',
        transactionsColor: 'blue-text',
      });
    }
  }
  render() {
    const { loading, players, game } = this.props;
    const { active, portfolioColor, transactionsColor } = this.state;
    if (loading) return <LoadingScreen />;
    return (
      <div>
        <div className="row">
          <h4 className="center-align">{game.name}</h4>
        </div>
        <div className="row">
          <div className="col l6 offset-l1">
            <Search />
          </div>
          <div className="col l3 offset-l1">
            <AddPlayers />
          </div>
        </div>
        <div className="row">
          <h5
            className={`${portfolioColor} col l1 offset-l1`}
            onClick={() => this.handleClick('portfolio')}
          >
            Portfolio
          </h5>
          <h5
            className={`${transactionsColor} col l4`}
            onClick={() => this.handleClick('transactions')}
          >
            Transactions
          </h5>
          <h5 className="col l3 offset-l2">Leaderboard</h5>
        </div>
        <div className="row">
          <div className="col l6 offset-l1">
            {active === 'portfolio' ? <Portfolio /> : <Transactions />}
          </div>
          <div className="col l3 offset-l1 z-depth-2">
            <Leaderboard players={players} />
          </div>
        </div>
      </div>
    );
  }
}

const mapState = state => ({
  game: state.game.selected,
  players: state.game.players,
  loading: state.game.loading,
});

const mapDispatch = {
  getPlayers,
  getGame,
  fetchPortfolio,
  fetchTransactions,
};

export default connect(
  mapState,
  mapDispatch
)(GameDashboard);
