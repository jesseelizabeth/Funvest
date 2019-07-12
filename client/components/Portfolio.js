import React, { Component } from 'react';
import LoadQuote from './LoadQuote';
import { totalCost } from '../../utils';

class Portfolio extends Component {
  render() {
    const { portfolio, transactions } = this.props;
    const costs = totalCost(transactions);

    return (
      <div>
        <div className="collection">
          <div className="collection-item grey lighten-5">
            <div className="row">
              <div className="col m2 bold">Ticker</div>
              <div className="col m2 bold">Shares</div>
              <div className="col m2 bold">Market Value</div>
              <div className="col m2 bold">Gain/Loss</div>
            </div>
          </div>
          {portfolio.map(stock => (
            <div className="collection-item" key={stock.id}>
              <LoadQuote stock={stock} cost={costs[stock.symbol]} />
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Portfolio;
