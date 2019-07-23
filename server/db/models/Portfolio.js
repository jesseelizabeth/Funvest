const Sequelize = require('sequelize');
const db = require('../db');

const Portfolio = db.define('portfolio', {
  balance: {
    type: Sequelize.DECIMAL(10, 2),
  },
  cost: {
    type: Sequelize.DECIMAL(10, 2),
    defaultValue: 0,
  },
  value: {
    type: Sequelize.DECIMAL(10, 2),
    defaultValue: 0,
  },
});

module.exports = Portfolio;
