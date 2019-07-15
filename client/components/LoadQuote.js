import React, { Component } from 'react';
import PortfolioListView from './PortfolioListView';
import { getColor, fetchPrices } from '../../utils';

class LoadQuote extends Component {
  constructor() {
    super();
    this.state = {
      color: 'grey-text',
    };
  }
  async componentDidMount() {
    const { stock } = this.props;
    await fetchPrices(stock);
    const color = getColor(stock.closePrice, stock.latestPrice);
    this.setState({ color });
  }
  render() {
    const { cost } = this.props;
    const { symbol, shares, latestPrice } = this.props.stock;
    const { color } = this.state;
    const currentValue = (latestPrice * shares).toFixed(2);
    const difference = (currentValue - cost).toFixed(2);
    return (
      <PortfolioListView
        symbol={symbol}
        shares={shares}
        currentValue={currentValue}
        color={color}
        price={latestPrice}
        difference={difference}
      />
    );
  }
}

export default LoadQuote;
