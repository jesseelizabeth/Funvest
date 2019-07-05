const router = require('express').Router();
const { Stock } = require('../db/models');
module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    const stocksOwned = await Stock.findAll({
      where: { userId: req.user.id },
    });
    res.json(stocksOwned);
  } catch (error) {
    next(error);
  }
});
