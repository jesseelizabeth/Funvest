import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPortfolio } from '../store/portfolio';
import TransactionListView from './TransactionListView';

class Transactions extends Component {
  componentDidMount() {
    const { id } = this.props.game;
    this.props.fetchPortfolio(id);
  }
  render() {
    const { portfolio } = this.props;
    return (
      <div>
        <div className="collection">
          <div className="collection-item grey lighten-5">
            <div className="row">
              <div className="col m2 bold">Transaction</div>
              <div className="col m2 bold">Ticker</div>
              <div className="col m2 bold">Shares</div>
              <div className="col m2 bold">Price</div>
              <div className="col m2 bold">Cost</div>
            </div>
          </div>
          {portfolio.transactions.map(transaction => (
            <div className="collection-item" key={transaction.id}>
              <TransactionListView
                type={transaction.type}
                symbol={transaction.symbol}
                shares={transaction.shares}
                price={transaction.price}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }
}

const mapState = state => ({
  portfolio: state.portfolio.portfolio,
  loading: state.portfolio.loading,
});

const mapDispatch = {
  fetchPortfolio,
};

export default connect(
  mapState,
  mapDispatch
)(Transactions);
