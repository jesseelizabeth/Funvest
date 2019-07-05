const Sequelize = require('sequelize');
const db = require('../db');

const Transaction = db.define('transaction', {
  type: {
    type: Sequelize.STRING,
  },
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
  price: {
    type: Sequelize.DECIMAL,
  },
});

module.exports = Transaction;
