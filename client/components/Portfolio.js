import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPortfolio, getBalance } from '../store/portfolio';
import LoadingScreen from './LoadingScreen';
import LoadQuote from './LoadQuote';

class Portfolio extends Component {
  componentDidMount() {
    this.props.fetchPortfolio();
    this.props.getBalance();
  }
  render() {
    const { portfolio, balance, loading } = this.props;
    if (loading) return <LoadingScreen />;
    return (
      <div>
        <div className="collection">
          <div className="collection-item right grey lighten-5">
            Current balance: ${balance}
          </div>
          <div className="collection-item grey lighten-5">
            <div className="row">
              <div className="col m2 bold">Ticker</div>
              <div className="col m2 bold">Shares</div>
              <div className="col m2 bold">Current Value</div>
              <div className="col m2 bold">Current Price</div>
            </div>
          </div>
          {portfolio.map(stock => (
            <div className="collection-item" key={stock.id}>
              <LoadQuote stock={stock} />
            </div>
          ))}
        </div>
      </div>
    );
  }
}

const mapState = state => ({
  balance: state.portfolio.balance,
  portfolio: state.portfolio.stocks,
  loading: state.portfolio.loading,
});

const mapDispatch = dispatch => ({
  fetchPortfolio: () => dispatch(fetchPortfolio()),
  getBalance: () => dispatch(getBalance()),
});

export default connect(
  mapState,
  mapDispatch
)(Portfolio);
