import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPortfolio } from '../store/portfolio';
import { totalCost } from '../../utils';
import LoadingScreen from './LoadingScreen';
import PortfolioListView from './PortfolioListView';

class Portfolio extends Component {
  constructor() {
    super();
    this.state = [];
  }
  async componentDidMount() {
    const { id } = this.props.game;
    await this.props.fetchPortfolio(id);
    const { transactions } = this.props.portfolio;
    const costs = totalCost(transactions);
    this.setState(costs);
  }
  render() {
    const { portfolio, loading } = this.props;
    if (loading) return <LoadingScreen />;
    return (
      <div>
        <div className="collection">
          <div className="collection-item grey lighten-5">
            <div className="row">
              <div className="col m2 bold">Ticker</div>
              <div className="col m2 bold">Shares</div>
              <div className="col m2 bold">Market Value</div>
              <div className="col m2 bold">Current Price</div>
              <div className="col m2 bold">Gain/Loss</div>
            </div>
          </div>
          {portfolio.stocks
            ? portfolio.stocks.map(stock => (
                <div className="collection-item" key={stock.id}>
                  <PortfolioListView
                    stock={stock}
                    cost={this.state[stock.symbol]}
                  />
                </div>
              ))
            : null}
        </div>
      </div>
    );
  }
}

const mapState = state => ({
  portfolio: state.portfolio.portfolio,
  loading: state.portfolio.loading,
});

const mapDispatch = {
  fetchPortfolio,
};

export default connect(
  mapState,
  mapDispatch
)(Portfolio);
