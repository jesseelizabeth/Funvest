import React, { Component } from 'react';
import Buy from './Buy';

class StockInfo extends Component {
  render() {
    const {
      companyName,
      symbol,
      latestPrice,
      change,
      changePercent,
    } = this.props.stock;
    const { color, balance, game } = this.props;
    return (
      <div>
        <br />
        <div className="col m7">
          <h5 className="bold">{companyName}</h5>
          <h5 className={color}>
            ${latestPrice ? latestPrice.toFixed(2) : latestPrice}
          </h5>
          <div>
            ${change ? change.toFixed(2) : change} (
            {changePercent ? changePercent.toFixed(2) : changePercent}%) Today
          </div>
        </div>

        <div className="col m5">
          <Buy
            symbol={symbol}
            price={latestPrice}
            balance={balance}
            game={game}
          />
        </div>
      </div>
    );
  }
}

export default StockInfo;
