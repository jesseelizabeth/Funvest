import React, { Component } from 'react';
import { getColor } from '../../utils';
import Sell from './Sell';

class PortfolioListView extends Component {
  constructor() {
    super();
    this.state = {
      color: 'grey-text',
    };
  }
  componentDidMount() {
    const { stock } = this.props;
    const color = getColor(stock.closePrice, stock.latestPrice);
    this.setState({ color });
  }

  render() {
    const { color } = this.state;
    const { stock, cost } = this.props;
    let difference = Number(stock.value) - cost;
    let differenceColor;
    if (difference >= 0) {
      differenceColor = 'green-text text-accent-2';
    } else {
      differenceColor = 'red-text text-accent-3';
    }
    return (
      <div className="row">
        <div className={`col m2 ${color}`}>{stock.symbol}</div>
        <div className="col m2">
          {stock.shares} {stock.shares === 1 ? 'share' : 'shares'}
        </div>
        <div className="col m2">${Number(stock.value)}</div>
        <div className={`col m2 ${color}`}>${stock.latestPrice}</div>
        <div className={`col m2 ${differenceColor}`}>
          ${difference.toFixed(2)}
        </div>
        <div className="col m2">
          <Sell
            symbol={stock.symbol}
            totalShares={stock.shares}
            price={Number(stock.latestPrice)}
          />
        </div>
      </div>
    );
  }
}

export default PortfolioListView;
