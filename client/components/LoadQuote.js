import React, { Component } from 'react';
import axios from 'axios';
import token from '../../secrets';
import PortfolioListView from './PortfolioListView';
import { getColor } from '../../utils';

class LoadQuote extends Component {
  constructor() {
    super();
    this.state = {
      price: null,
      open: null,
      color: 'grey-text',
    };
  }
  async componentDidMount() {
    const { stock } = this.props;
    const { data } = await axios.get(
      `https://cloud.iexapis.com/v1/stock/${
        stock.symbol
      }/quote?displayPercent=true&token=${token.token}`
    );
    this.setState({ price: data.latestPrice, open: data.open });

    const { open, price } = this.state;
    const color = getColor(open, price);
    this.setState({ color });
  }
  render() {
    const { symbol, shares } = this.props.stock;
    const { color, price } = this.state;
    const currentValue = price * shares;
    return (
      <PortfolioListView
        symbol={symbol}
        shares={shares}
        currentValue={currentValue}
        color={color}
        price={price}
      />
    );
  }
}

export default LoadQuote;
