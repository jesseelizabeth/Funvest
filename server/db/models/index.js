const User = require('./User');
const Stock = require('./Stock');
const Transaction = require('./Transaction');
const Game = require('./Game');
const Portfolio = require('./Portfolio');

Portfolio.belongsTo(User);
Portfolio.belongsTo(Game);

Transaction.belongsTo(Portfolio);
Portfolio.hasMany(Transaction);

Stock.belongsTo(Portfolio);
Portfolio.hasMany(Stock);

module.exports = { User, Stock, Transaction, Game, Portfolio };
