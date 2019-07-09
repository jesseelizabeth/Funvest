import React, { Component } from 'react';
import StockInfo from './StockInfo';
import News from './News';

class StockDashbaord extends Component {
  render() {
    const { symbol } = this.props.match.params;
    return (
      <div>
        <div className="row">
          <StockInfo symbol={symbol} />
        </div>
        <div className="row">
          <div className="col l6 offset-l3">
            <News symbol={symbol} />
          </div>
        </div>
      </div>
    );
  }
}

export default StockDashbaord;
