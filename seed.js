const db = require('./server/db');
const { green, red } = require('chalk');

const { User, Transaction, Stock } = require('./server/db/models');
const seed = async () => {
  await db.sync({ force: true });

  // seed your database here!
  await Promise.all([
    await User.create({
      firstName: 'Jesse',
      lastName: 'Test',
      email: 'test@test.com',
      password: 'test',
    }),
    Transaction.create({
      type: 'buy',
      symbol: 'AAPL',
      shares: 10,
      price: 201.1,
      userId: 1,
    }),
    Transaction.create({
      type: 'buy',
      symbol: 'AAPL',
      shares: 2,
      price: 100.1,
      userId: 1,
    }),
    Transaction.create({
      type: 'buy',
      symbol: 'TWTR',
      shares: 20,
      price: 36.17,
      userId: 1,
    }),
    Stock.create({ symbol: 'AAPL', shares: 12, userId: 1 }),
    Stock.create({ symbol: 'TWTR', shares: 20, userId: 1 }),
  ]);

  console.log(green('Seeding success!'));
  db.close();
};

seed().catch(err => {
  console.error(red('Oh noes! Something went wrong!'));
  console.error(err);
  db.close();
});
