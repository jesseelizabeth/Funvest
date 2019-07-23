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
  stock.latestPrice = Number(data.latestPrice.toFixed(2));
  stock.closePrice = Number(data.close.toFixed(2));
  return stock;
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

export const portfolioValue = stocks => {
  return stocks.reduce((accum, curr) => {
    console.log('CURR', curr.totalValue, typeof curr.totalValue);
    return accum + curr.totalValue;
  }, 0);
};

export const portfolioCost = transactions => {
  let total = 0;
  transactions.map(transaction => {
    if (transaction.type === 'buy') {
      total += Number(transaction.price) * Number(transaction.shares);
    } else {
      total -= Number(transaction.price) * Number(transaction.shares);
    }
  });
  return total.toFixed(2);
};
