import React, { Component } from 'react';
import LoadQuote from './LoadQuote';

class Portfolio extends Component {
  render() {
    const { portfolio, transactions } = this.props;
    return (
      <div>
        <div className="collection">
          <div className="collection-item grey lighten-5">
            <div className="row">
              <div className="col m2 bold">Ticker</div>
              <div className="col m2 bold">Shares</div>
              <div className="col m2 bold">Market Value</div>
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

export default Portfolio;
