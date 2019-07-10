import React, { Component } from 'react';
import Buy from './Buy';
import { getColor } from '../../utils';
import LoadingScreen from './LoadingScreen';

class StockInfo extends Component {
  constructor() {
    super();
    this.state = {
      color: 'grey-text',
    };
  }
  componentDidMount() {
    const { open, latestPrice } = this.props.stock;
    const color = getColor(open, latestPrice);
    this.setState({ color });
  }
  render() {
    const {
      companyName,
      symbol,
      latestPrice,
      change,
      changePercent,
      loading,
    } = this.props.stock;
    if (loading) return <LoadingScreen />;
    return (
      <div>
        <br />
        <div className="col m7">
          <h5 className="bold">{companyName}</h5>
          <h5 className={this.state.color}>${latestPrice}</h5>
          <div>
            ${change} ({changePercent}%) Today
          </div>
        </div>

        <div className="col m5">
          <Buy symbol={symbol} price={latestPrice} />
        </div>
      </div>
    );
  }
}

export default StockInfo;
