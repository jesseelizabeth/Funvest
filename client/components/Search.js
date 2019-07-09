import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getQuote } from '../store/stockQuote';
import StockInfo from './StockInfo';
import { Link } from 'react-router-dom';

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
  handleSubmit() {
    const { symbol } = this.state;
    this.props.getQuote(symbol);
    this.setState({ symbol: '' });
  }

  render() {
    return (
      <div>
        <h5>Buy Stock</h5>
        <form>
          <div className="input-field">
            <input
              type="text"
              value={this.state.symbol}
              onChange={this.handleChange}
              placeholder="Ticker"
            />
          </div>
          <Link to={`/quote/${this.state.symbol}`}>
            <button
              className="teal accent-3 btn-small"
              type="submit"
              onClick={this.handleSubmit}
            >
              Search
            </button>
          </Link>
        </form>
        <div />
      </div>
    );
  }
}

const mapDispatch = dispatch => ({
  getQuote: ticker => dispatch(getQuote(ticker)),
});

export default connect(
  null,
  mapDispatch
)(Search);
