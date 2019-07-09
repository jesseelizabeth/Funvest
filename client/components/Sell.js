import React, { Component } from 'react';
import { connect } from 'react-redux';
import { tradeStock } from '../store/portfolio';

class Sell extends Component {
  constructor() {
    super();
    this.state = {
      shares: '',
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    this.setState({ shares: event.target.value });
  }
  handleClick() {
    const { symbol, price, totalShares, gameId } = this.props;
    const shares = Number(this.state.shares);
    const transaction = { type: 'sell', symbol, shares, price };
    if (shares <= totalShares) {
      this.props.tradeStock(transaction, gameId);
      this.setState({ shares: '' });
      M.toast({
        html: `Your trade was successful: ${symbol} ${shares} shares`,
      });
    } else if (shares % 1 !== 0) {
      M.toast({ html: 'Must sell a whole number of shares!' });
    } else {
      M.toast({ html: 'Insufficient shares for sale' });
    }
  }
  render() {
    return (
      <div className="row">
        <div className="col l2">
          <input
            type="text"
            onChange={this.handleChange}
            placeholder="Shares"
          />
        </div>
        <div className="col l2">
          <button
            disabled={!this.state.shares}
            className="prefix teal accent-3 btn-small"
            type="button"
            onClick={this.handleClick}
          >
            Sell
          </button>
        </div>
      </div>
    );
  }
}

const mapState = state => ({
  gameId: state.game.selected.id,
});

const mapDispatch = {
  tradeStock,
};

export default connect(
  mapState,
  mapDispatch
)(Sell);
