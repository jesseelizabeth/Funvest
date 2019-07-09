import React, { Component } from 'react';
import { connect } from 'react-redux';
import Buy from './Buy';
import { getColor } from '../../utils';
import { getQuote } from '../store/stockQuote';
import LoadingScreen from './LoadingScreen';

class StockInfo extends Component {
  constructor() {
    super();
    this.state = {
      color: 'grey-text',
      buy: false,
    };
    this.handleClick = this.handleClick.bind(this);
  }
  async componentDidMount() {
    const { symbol } = this.props;
    await this.props.getQuote(symbol);
    const { open, latestPrice } = this.props.stock;
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
      loading,
    } = this.props.stock;
    if (loading) return <LoadingScreen />;
    return (
      <div className="row">
        <div className="col l6 offset-l3">
          <div>
            <div className="section center-align">
              <h5 className={this.state.color}>{companyName}</h5>
              <h5 className={this.state.color}>${latestPrice}</h5>

              <div>
                ${change} ({changePercent}%)
              </div>
            </div>
            <div className="divider" />
            <div className="section center-align">
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
        </div>
      </div>
    );
  }
}

const mapState = state => ({
  loading: state.stockQuote.loading,
  stock: state.stockQuote.quote,
});

const mapDispatch = {
  getQuote,
};

export default connect(
  mapState,
  mapDispatch
)(StockInfo);
