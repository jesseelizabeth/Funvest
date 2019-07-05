import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getQuote } from '../store/stockQuote';
import StockInfo from './StockInfo';

class Search extends Component {
  constructor() {
    super();
    this.state = {
      symbol: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    this.setState({ symbol: event.target.value });
  }
  handleSubmit(event) {
    event.preventDefault();
    const { symbol } = this.state;
    this.props.getQuote(symbol);
    this.setState({ symbol: '' });
  }

  render() {
    const { stock } = this.props;
    return (
      <div>
        <div className="row">
          <div className="col s12 m4 offset-m4">
            <form onSubmit={this.handleSubmit}>
              <div className="input-field">
                <input
                  type="text"
                  value={this.state.symbol}
                  onChange={this.handleChange}
                  placeholder="Ticker"
                />
              </div>
              <button className="teal accent-3 btn-small" type="submit">
                Search
              </button>
            </form>
          </div>
        </div>
        <div className="row">
          <div className="col s12 m4 offset-m4">
            {stock.symbol ? (
              <StockInfo
                key={stock.symbol}
                companyName={stock.companyName}
                symbol={stock.symbol}
                latestPrice={stock.latestPrice}
                open={stock.open}
                change={stock.change}
                changePercent={stock.changePercent}
              />
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

const mapState = state => ({
  stock: state.stockQuote,
});

const mapDispatch = dispatch => ({
  getQuote: ticker => dispatch(getQuote(ticker)),
});

export default connect(
  mapState,
  mapDispatch
)(Search);
