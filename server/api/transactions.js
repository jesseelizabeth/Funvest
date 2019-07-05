const router = require('express').Router();
const { Transaction, Stock, User } = require('../db/models');
module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    const transactions = await Transaction.findAll({
      where: { userId: req.user.id },
    });
    res.json(transactions);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    // record transaction
    const transaction = await Transaction.create({
      type: req.body.type,
      symbol: req.body.symbol,
      shares: req.body.shares,
      price: req.body.price,
      userId: req.user.id,
    });

    // update stock to reflect transaction
    const stockToUpdate = await Stock.findOne({
      where: { symbol: transaction.symbol, userId: req.user.id },
    });
    if (stockToUpdate) {
      await stockToUpdate.update({
        shares: stockToUpdate.shares + transaction.shares,
      });
    } else {
      await Stock.create({
        symbol: transaction.symbol,
        shares: transaction.shares,
        userId: req.user.id,
      });
    }

    // update user balance
    const user = await User.findOne({
      where: { id: req.user.id },
    });
    await user.update({
      balance: user.balance - transaction.shares * transaction.price,
    });

    res.json(transaction);
  } catch (error) {
    next(error);
  }
});
