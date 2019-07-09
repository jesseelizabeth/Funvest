const Sequelize = require('sequelize');
const db = require('../db');

const Game = db.define('game', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  startingBalance: {
    type: Sequelize.DECIMAL(10, 2),
    defaultValue: 5000,
  },
});

module.exports = Game;
