import React, { Component } from 'react';
import Buy from './Buy';
import { getColor } from '../../utils';

class StockInfo extends Component {
  constructor() {
    super();
    this.state = {
      color: 'grey-text',
      buy: false,
    };
    this.handleClick = this.handleClick.bind(this);
  }
  componentDidMount() {
    const { open, latestPrice } = this.props;
    const color = getColor(open, latestPrice);
    this.setState({ color });
  }
  handleClick() {
    // toggle for the buy button
    this.setState(prevState => ({
      ...prevState,
      buy: !prevState.buy,
    }));
  }
  render() {
    const {
      companyName,
      symbol,
      latestPrice,
      change,
      changePercent,
    } = this.props;
    return (
      <div className="z-depth-1">
        <div className="section">
          <h5 className={this.state.color}>{companyName}</h5>
          <h5 className={this.state.color}>${latestPrice.toFixed(2)}</h5>

          <div>
            ${change.toFixed(2)} ({changePercent.toFixed(2)}%)
          </div>
        </div>
        <div className="divider" />
        <div className="section">
          {this.state.buy ? (
            <Buy symbol={symbol} price={latestPrice} />
          ) : (
            <button
              type="button"
              className="teal accent-3 btn-small"
              onClick={this.handleClick}
            >
              Buy {symbol}
            </button>
          )}
        </div>
      </div>
    );
  }
}

export default StockInfo;
