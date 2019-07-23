const router = require('express').Router();
const { Player, Game, User, Stock, Transaction } = require('../db/models');
module.exports = router;

// get all players for a game
router.get('/:gameId', async (req, res, next) => {
  try {
    const players = await Player.findAll({
      order: [['balance', 'DESC']],
      where: { gameId: req.params.gameId },
      include: { model: User },
    });
    res.json(players);
  } catch (error) {
    next(error);
  }
});

// get portfolio for a single player
router.get('/:playerId/portfolio', async (req, res, next) => {
  try {
    const portfolio = {};
    const player = await Player.findOne({
      where: { id: req.params.playerId },
    });
    const stocks = await Stock.findAll({
      where: { playerId: player.id },
    });
    const transactions = await Transaction.findAll({
      where: { playerId: player.id },
    });
    portfolio.player = player;
    portfolio.stocks = stocks;
    portfolio.transactions = transactions;
    res.json(portfolio);
  } catch (error) {
    next(error);
  }
});

// add player to a game
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
    const playerExists = await Player.findOne({
      where: { userId: user.id, gameId: game.id },
    });
    if (playerExists) {
      res.send('Player already exists');
    } else {
      // create a new player with the starting balance
      const newPlayer = await Player.create({
        userId: user.id,
        gameId: req.params.gameId,
        balance: game.startingBalance,
      });
      const player = await Player.findOne({
        where: { id: newPlayer.id },
        include: { model: User },
      });
      res.json(player);
    }
  } catch (error) {
    next(error);
  }
});
