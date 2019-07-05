const User = require('./user');
const Stock = require('./Stock');
const Transaction = require('./Transaction');

Transaction.belongsTo(User);
User.hasMany(Transaction);

Stock.belongsTo(User);
User.hasMany(Stock);

module.exports = { User, Stock, Transaction };
