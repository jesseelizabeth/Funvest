const User = require('./user');
const Stock = require('./Stock');
const Transaction = require('./Transaction');
const Game = require('./Game');
const Player = require('./Player');

Player.belongsTo(User);
Player.belongsTo(Game);

Transaction.belongsTo(Player);
Player.hasMany(Transaction);

Stock.belongsTo(Player);
Player.hasMany(Stock);

module.exports = { User, Stock, Transaction, Game, Player };
