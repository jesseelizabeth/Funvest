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

// get a single player for a game
router.get('/:gameId/:playerId', async (req, res, next) => {
  try {
    const player = await Player.findOne({
      where: { gameId: req.params.gameId, playerId: req.params.playerId },
      include: { model: User },
    });
    res.json(player);
  } catch (error) {
    next(error);
  }
});

// get portfolio for a single player
router.get('/:gameId/:playerId/portfolio', async (req, res, next) => {
  try {
    const playerPortfolio = await Player.findOne({
      where: { gameId: req.params.gameId, playerId: req.params.playerId },
      include: { model: Stock },
    });
    res.json(playerPortfolio);
  } catch (error) {
    next(error);
  }
});

// get transactions for a single player
router.get('/:gameId/:playerId/transactions', async (req, res, next) => {
  try {
    const playerTransactions = await Player.findOne({
      where: { gameId: req.params.gameId, playerId: req.params.playerId },
      include: { model: Transaction },
    });
    res.json(playerTransactions);
  } catch (error) {
    next(error);
  }
});

// get balance for a single player
// router.get('/:gameId/:playerId/balance', async (req, res, next) => {
//   try {
//     console.log('HEYYYYY');
//     const portfolio = await Player.findOne({
//       where: { gameId: req.params.gameId, playerId: req.params.playerId },
//       include: [{ model: Transaction }, { model: Stock }],
//     });
//     console.log('PORTFOLIO', portfolio);
//     res.json(portfolio);
//   } catch (error) {
//     next(error);
//   }
// });

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
