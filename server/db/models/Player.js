const Sequelize = require('sequelize');
const db = require('../db');

const Player = db.define('player', {
  balance: {
    type: Sequelize.DECIMAL(10, 2),
  },
});

module.exports = Player;
