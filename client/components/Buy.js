/* eslint-disable no-shadow */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { tradeStock } from '../store/portfolio';

import M from 'materialize-css';

class Buy extends Component {
  constructor() {
    super();
    this.state = {
      shares: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ shares: event.target.value });
  }
  handleSubmit(event) {
    event.preventDefault();
    const { symbol, price, tradeStock, balance, game } = this.props;
    const { shares } = this.state;
    const total = shares * price;
    if (total <= balance && shares % 1 === 0) {
      tradeStock({ type: 'buy', symbol, shares, price }, game.id);
      M.toast({
        html: `Your purchase was submitted: ${symbol} ${shares} shares`,
      });
    } else if (shares % 1 !== 0) {
      M.toast({ html: 'Must buy a whole number of shares!' });
    } else {
      M.toast({ html: 'Insufficient balance for purchase' });
    }
    this.setState({ shares: '' });
  }
  render() {
    const { symbol, price, balance } = this.props;
    console.log('BALANCE', balance);
    return (
      <div className="card-panel">
        <div className="bold">Buy {symbol}</div>
        <div className="divider" />

        <div className="row">
          <div className="col s6">
            <br />
            <div>Shares</div>
          </div>
          <div className="col s3 offset-s3 right-align">
            <input
              type="text"
              value={this.state.shares}
              onChange={this.handleChange}
            />
          </div>
        </div>
        <div className="row">
          <div className="col s6">
            <div>Current Price</div>
          </div>
          <div className="col s6 right-align">
            <div>${price}</div>
          </div>
        </div>
        <div className="row">
          <div className="col s6">
            <div className="bold">Estimated Cost</div>
          </div>
          <div className="col s6 right-align">
            <div>${(price * this.state.shares).toFixed(2)}</div>
          </div>
        </div>
        <div className="row">
          <button
            disabled={!this.state.shares}
            className="btn teal accent-3 col s12"
            type="submit"
            onClick={this.handleSubmit}
          >
            Buy {symbol}
          </button>
        </div>
        <div className="divider" />
        <br />
        <div className="row">
          <div className="center-align">${balance} available</div>
        </div>
      </div>
    );
  }
}

const mapDispatch = {
  tradeStock,
};

export default connect(
  null,
  mapDispatch
)(Buy);
