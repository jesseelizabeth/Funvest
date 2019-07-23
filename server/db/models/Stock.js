const Sequelize = require('sequelize');
const db = require('../db');

const Stock = db.define('stock', {
  symbol: {
    type: Sequelize.STRING,
  },
  shares: {
    type: Sequelize.INTEGER,
    validate: {
      isInt: true,
      min: 0,
    },
  },
  latestPrice: {
    type: Sequelize.DECIMAL(10, 2),
    defaultValue: null,
  },
  closePrice: {
    type: Sequelize.DECIMAL(10, 2),
    defaultValue: null,
  },
  value: {
    type: Sequelize.DECIMAL(10, 2),
    defaultValue: null,
  },
});

module.exports = Stock;
