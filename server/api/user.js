const router = require('express').Router();
const { User } = require('../db/models');
module.exports = router;

// find a user
router.get('/:userEmail', async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: { email: req.params.userEmail },
    });
    res.json(user);
  } catch (error) {
    next(error);
  }
});
