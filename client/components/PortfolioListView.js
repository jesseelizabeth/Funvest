import React, { Component } from 'react';
import Sell from './Sell';

class PortfolioListView extends Component {
  render() {
    const {
      symbol,
      shares,
      currentValue,
      color,
      price,
      difference,
    } = this.props;
    let differenceColor;
    if (difference >= 0) {
      differenceColor = 'green-text text-accent-2';
    } else {
      differenceColor = 'red-text text-accent-3';
    }
    return (
      <div className="row">
        <div className={`col m2 ${color}`}>{symbol}</div>
        <div className="col m2">
          {shares} {shares === 1 ? 'share' : 'shares'}
        </div>
        <div className="col m2">${currentValue.toFixed(2)}</div>
        <div className={`col m2 ${differenceColor}`}>${difference}</div>
        <div className="col m4">
          <Sell symbol={symbol} totalShares={shares} price={price} />
        </div>
      </div>
    );
  }
}

export default PortfolioListView;
