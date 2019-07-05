import React from 'react';

const TransactionListView = props => {
  const { type, symbol, shares, price } = props;
  return (
    <div className="row">
      <div className="col m2">{type.toUpperCase()}</div>
      <div className="col m2">{symbol}</div>
      <div className="col m2">
        {shares} {shares === 1 ? 'share' : 'shares'}
      </div>
      <div className="col m2">${price}</div>
    </div>
  );
};

export default TransactionListView;
