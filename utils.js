import token from './secrets';
import axios from 'axios';

export const getColor = (close, latestPrice) => {
  if (close === latestPrice) {
    return 'grey-text';
  } else if (close < latestPrice) {
    return 'green-text text-accent-2';
  } else {
    return 'red-text text-accent-3';
  }
};

export const fetchPrices = async stock => {
  const { data } = await axios.get(
    `https://cloud.iexapis.com/v1/stock/${
      stock.symbol
    }/quote?displayPercent=true&token=${token.token}`
  );
  stock.latestPrice = data.latestPrice;
  stock.closePrice = data.close;
};

export const totalCost = transactions => {
  let costs = [];
  transactions.map(transaction => {
    if (costs[transaction.symbol] && transaction.type === 'buy') {
      costs[transaction.symbol] +=
        Number(transaction.price) * Number(transaction.shares).toFixed(2);
    } else if (costs[transaction.symbol] && transaction.type === 'sell') {
      costs[transaction.symbol] -= (
        Number(transaction.price) * Number(transaction.shares)
      ).toFixed(2);
    } else {
      costs[transaction.symbol] =
        Number(transaction.price) * Number(transaction.shares).toFixed(2);
    }
  });
  return costs;
};
