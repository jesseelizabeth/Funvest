const router = require('express').Router();
const User = require('../db/models/User');
module.exports = router;

router.post('/login', async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (!user) {
      console.log('No such user found:', req.body.email);
      res.status(401).send('Wrong email and/or password');
    } else if (!user.correctPassword(req.body.password)) {
      console.log('Incorrect password for user:', req.body.email);
      res.status(401).send('Wrong email and/or password');
    } else {
      req.login(user, err => {
        err ? next(err) : res.json(user);
      });
    }
  } catch (error) {
    next(error);
  }
});

router.post('/signup', async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    req.login(user, err => {
      err ? next(err) : res.json(user);
    });
  } catch (error) {
    next(error);
  }
});

router.post('/logout', (req, res) => {
  req.logout();
  req.session.destroy();
  res.redirect('/');
});

router.get('/me', (req, res) => {
  res.json(req.user);
});