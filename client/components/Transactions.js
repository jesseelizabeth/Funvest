import React, { Component } from 'react';
import TransactionListView from './TransactionListView';

class Transactions extends Component {
  render() {
    const { transactions } = this.props;
    return (
      <div>
        <div className="collection">
          <div className="collection-item grey lighten-5">
            <div className="row">
              <div className="col m2 bold">Transaction</div>
              <div className="col m2 bold">Ticker</div>
              <div className="col m2 bold">Shares</div>
              <div className="col m2 bold">Price</div>
            </div>
          </div>
          {transactions.map(transaction => (
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

export default Transactions;
