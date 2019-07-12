import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getPlayers, getGame, getBalance } from '../store/game';
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
      portfolio,
      transactions,
      loadingPortfolio,
      game,
      user,
    } = this.props;
    const { active, portfolioColor, transactionsColor } = this.state;
    const { name } = this.props.location.state || game.game;
    if (loadingGame || loadingPortfolio) return <LoadingScreen />;
    return (
      <div>
        <div className="row">
          <h5 className="center-align bold">{name}</h5>
        </div>
        <div className="divider" />
        <br />
        <div className="container">
          <div className="row">
            <div className="col l6">
              <div className="card-panel z-depth-0 grey lighten-5">
                <Search game={game} />
              </div>
              <div className="card-panel z-depth-0 grey lighten-5">
                <AddPlayers />
              </div>
            </div>
            <div className="col l4 offset-l2 z-depth-2">
              <Leaderboard
                players={players}
                user={user}
                gameId={this.props.match.params}
              />
            </div>
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
                <Portfolio portfolio={portfolio} transactions={transactions} />
              ) : (
                <Transactions
                  transactions={transactions}
                  loading={loadingPortfolio}
                />
              )}
            </div>
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
  portfolio: state.portfolio.stocks,
  transactions: state.portfolio.transactions,
  loadingPortfolio: state.portfolio.loading,
  user: state.user,
});

const mapDispatch = {
  getPlayers,
  getGame,
  fetchPortfolio,
  fetchTransactions,
  getBalance,
};

export default connect(
  mapState,
  mapDispatch
)(GameDashboard);
