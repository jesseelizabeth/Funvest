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
});

module.exports = Stock;
