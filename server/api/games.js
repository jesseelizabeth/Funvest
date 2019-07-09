const router = require('express').Router();
const { Player, Game, User, Stock, Transaction } = require('../db/models');
module.exports = router;

// get all games for a user
router.get('/', async (req, res, next) => {
  try {
    const games = await Player.findAll({
      where: { userId: req.user.id },
      include: { model: Game },
    });
    res.json(games);
  } catch (error) {
    next(error);
  }
});

// get a specific game for a user
router.get('/:gameId', async (req, res, next) => {
  try {
    const game = await Player.findOne({
      where: { userId: req.user.id, gameId: req.params.gameId },
      include: { model: Game },
    });
    res.json(game);
  } catch (error) {
    next(error);
  }
});

// get portfolio for a player
router.get('/:gameId/portfolio', async (req, res, next) => {
  try {
    const player = await Player.findOne({
      where: { userId: req.user.id, gameId: req.params.gameId },
    });
    const portfolio = await Stock.findAll({
      where: { playerId: player.id },
    });
    res.json(portfolio);
  } catch (error) {
    next(error);
  }
});

// get transactions for a player
router.get('/:gameId/transactions', async (req, res, next) => {
  try {
    const player = await Player.findOne({
      where: { userId: req.user.id, gameId: req.params.gameId },
    });
    const transactions = await Transaction.findAll({
      where: { playerId: player.id },
    });
    res.json(transactions);
  } catch (error) {
    next(error);
  }
});

// create a new game
router.post('/', async (req, res, next) => {
  try {
    const newGame = await Game.create({
      name: req.body.name,
      startingBalance: req.body.startingBalance,
    });
    // add user to that game
    await Player.create({
      userId: req.user.id,
      gameId: newGame.id,
      balance: newGame.startingBalance,
    });
    // send back player with game
    const game = await Player.findOne({
      where: { userId: req.user.id, gameId: newGame.id },
      include: { model: Game },
    });
    res.json(game);
  } catch (error) {
    next(error);
  }
});

// transaction - add to user portfolio
router.post('/:gameId/transactions', async (req, res, next) => {
  try {
    // find user for this game
    const player = await Player.findOne({
      where: { userId: req.user.id, gameId: req.params.gameId },
    });
    // create a new transaction
    const transaction = await Transaction.create({
      type: req.body.type,
      symbol: req.body.symbol,
      shares: req.body.shares,
      price: req.body.price,
      playerId: player.id,
    });
    // update portfolio with new transaction
    const stockToUpdate = await Stock.findOne({
      where: { playerId: player.id, symbol: transaction.symbol },
    });
    if (stockToUpdate) {
      if (transaction.type === 'buy') {
        await stockToUpdate.update({
          shares: stockToUpdate.shares + transaction.shares,
        });
      } else {
        await stockToUpdate.update({
          shares: stockToUpdate.shares - transaction.shares,
        });
      }
    } else {
      await Stock.create({
        symbol: transaction.symbol,
        shares: transaction.shares,
        playerId: player.id,
      });
    }
    // update user balance for that game
    if (transaction.type === 'buy') {
      await player.update({
        balance:
          Number(player.balance) - transaction.shares * transaction.price,
      });
    } else {
      await player.update({
        balance:
          Number(player.balance) + transaction.shares * transaction.price,
      });
    }
    res.json(transaction);
  } catch (error) {
    next(error);
  }
});
