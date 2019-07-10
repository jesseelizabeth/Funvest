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
      portfolioColor: 'teal-text text-accent-3 bold',
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
        portfolioColor: 'teal-text text-accent-3 bold',
        transactionsColor: 'black-text',
      });
    } else {
      this.setState({
        active,
        portfolioColor: 'black-text',
        transactionsColor: 'teal-text text-accent-3 bold',
      });
    }
  }
  render() {
    const {
      loadingGame,
      players,
      transactions,
      loadingPortfolio,
      game,
      user,
    } = this.props;
    const { active, portfolioColor, transactionsColor } = this.state;
    const { gameName } = this.props.location.state;
    if (loadingGame || loadingPortfolio) return <LoadingScreen />;
    return (
      <div className="container">
        <div className="row">
          <h5 className="center-align bold">{gameName}</h5>
        </div>
        <div className="divider" />
        <br />
        <div className="row">
          <div className="col l8">
            <Search game={game} />
          </div>
          <div className="col l4 z-depth-2">
            <Leaderboard players={players} user={user} />
          </div>
          {/* <div className="col l3">
            <AddPlayers />
          </div> */}
        </div>
        <div className="row">
          <h5
            className={`${portfolioColor} col l2`}
            onClick={() => this.handleClick('portfolio')}
          >
            Portfolio
          </h5>
          <h5
            className={`${transactionsColor} col l7`}
            onClick={() => this.handleClick('transactions')}
          >
            Transactions
          </h5>
        </div>
        <div className="row">
          <div className="col s12">
            {active === 'portfolio' ? (
              <Portfolio />
            ) : (
              <Transactions
                transactions={transactions}
                loading={loadingPortfolio}
              />
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapState = state => ({
  game: state.game.selected,
  players: state.game.players,
  loadingGame: state.game.loading,
  transactions: state.portfolio.transactions,
  loadingPortfolio: state.portfolio.loading,
  user: state.user,
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
