const router = require('express').Router();
const { Portfolio, Game, User, Stock, Transaction } = require('../db/models');
const token = require('../../secrets');
const axios = require('axios');
module.exports = router;

// get all games for a user
router.get('/', async (req, res, next) => {
  try {
    const games = await Portfolio.findAll({
      where: { userId: req.user.id },
      include: { model: Game },
    });
    res.json(games);
  } catch (error) {
    next(error);
  }
});

// get a specific game
router.get('/:gameId', async (req, res, next) => {
  try {
    const game = await Game.findOne({
      where: { id: req.params.gameId },
    });
    res.json(game);
  } catch (error) {
    next(error);
  }
});

// get portfolio for a user
router.get('/:gameId/portfolio', async (req, res, next) => {
  try {
    const portfolio = await Portfolio.findOne({
      where: { userId: req.user.id, gameId: req.params.gameId },
      include: [{ model: Stock }, { model: Transaction }, { model: Game }],
    });
    await portfolio.stocks.map(async stock => {
      const { data } = await axios.get(
        `https://cloud.iexapis.com/v1/stock/${
          stock.symbol
        }/quote?displayPercent=true&token=${token.token}`
      );
      await stock.update({
        latestPrice: Number(data.latestPrice),
        closePrice: Number(data.previousClose),
        value: Number(stock.latestPrice) * Number(stock.shares),
      });
    });

    let value = 0;
    portfolio.stocks.map(stock => {
      value += Number(stock.value);
    });
    const difference = value - Number(portfolio.cost);
    await portfolio.update({
      balance: Number(portfolio.game.startingBalance) + difference,
    });
    res.json(portfolio);
  } catch (error) {
    next(error);
  }
});

// get all portfolios for a specific game
router.get('/:gameId/portfolios', async (req, res, next) => {
  try {
    const portfolios = await Portfolio.findAll({
      order: [['balance', 'DESC']],
      where: { gameId: req.params.gameId },
      include: [
        { model: User },
        { model: Game },
        { model: Stock },
        { model: Transaction },
      ],
    });
    await portfolios.map(async portfolio => {
      await portfolio.stocks.map(async stock => {
        const { data } = await axios.get(
          `https://cloud.iexapis.com/v1/stock/${
            stock.symbol
          }/quote?displayPercent=true&token=${token.token}`
        );
        await stock.update({
          latestPrice: Number(data.latestPrice),
          closePrice: Number(data.previousClose),
          value: Number(stock.latestPrice) * Number(stock.shares),
        });
      });
      let value = 0;
      portfolio.stocks.map(stock => {
        value += Number(stock.value);
      });
      const difference = value - Number(portfolio.cost);
      await portfolio.update({
        balance: Number(portfolio.game.startingBalance) + difference,
      });
    });
    res.json(portfolios);
  } catch (error) {
    next(error);
  }
});

// get a portfolio
router.get('/:gameId//portfolio/:portfolioId', async (req, res, next) => {
  try {
    const portfolio = await Portfolio.findOne({
      where: { userId: req.params.portfolioId, gameId: req.params.gameId },
      include: [{ model: Stock }, { model: Transaction }],
    });
    res.json(portfolio);
  } catch (error) {
    next(error);
  }
});

// transaction - add to user portfolio
router.post('/:gameId/transactions', async (req, res, next) => {
  try {
    // find user for this game
    const portfolio = await Portfolio.findOne({
      where: { userId: req.user.id, gameId: req.params.gameId },
    });

    // update cost
    if (req.body.type === 'buy') {
      await portfolio.update({
        cost: Number(portfolio.cost) + req.body.shares * Number(req.body.price),
      });
    } else {
      await portfolio.update({
        cost: Number(portfolio.cost) - req.body.shares * Number(req.body.price),
      });
    }

    // create a new transaction
    const transaction = await Transaction.create({
      type: req.body.type,
      symbol: req.body.symbol,
      shares: req.body.shares,
      price: req.body.price,
      portfolioId: portfolio.id,
    });
    // update portfolio with new transaction
    const stockToUpdate = await Stock.findOne({
      where: { portfolioId: portfolio.id, symbol: transaction.symbol },
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
        portfolioId: portfolio.id,
      });
    }

    res.json(transaction);
  } catch (error) {
    next(error);
  }
});

// add portfolio to a game
router.post('/:gameId/:userEmail', async (req, res, next) => {
  try {
    // find the game
    const game = await Game.findOne({
      where: { id: req.params.gameId },
    });
    // find the user by email
    const user = await User.findOne({
      where: { email: req.params.userEmail },
    });
    const portfolioExists = await Portfolio.findOne({
      where: { userId: user.id, gameId: game.id },
    });
    if (portfolioExists) {
      res.send('portfolio already exists');
    } else {
      // create a new portfolio with the starting balance
      const newportfolio = await Portfolio.create({
        userId: user.id,
        gameId: req.params.gameId,
        balance: game.startingBalance,
      });
      const portfolio = await Portfolio.findOne({
        where: { id: newportfolio.id },
        include: { model: User },
      });
      res.json(portfolio);
    }
  } catch (error) {
    next(error);
  }
});

// // get transactions for a portfolio
// router.get('/:gameId/transactions', async (req, res, next) => {
//   try {
//     const portfolio = await portfolio.findOne({
//       where: { userId: req.user.id, gameId: req.params.gameId },
//     });
//     const transactions = await Transaction.findAll({
//       where: { portfolioId: portfolio.id },
//     });
//     res.json(transactions);
//   } catch (error) {
//     next(error);
//   }
// });

// create a new game
router.post('/', async (req, res, next) => {
  try {
    const newGame = await Game.create({
      name: req.body.name,
      startingBalance: req.body.startingBalance,
    });
    // add user to that game
    await Portfolio.create({
      userId: req.user.id,
      gameId: newGame.id,
      balance: newGame.startingBalance,
    });
    // send back portfolio with game
    const game = await Portfolio.findOne({
      where: { userId: req.user.id, gameId: newGame.id },
      include: { model: Game },
    });
    res.json(game);
  } catch (error) {
    next(error);
  }
});
