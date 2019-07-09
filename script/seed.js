const db = require('../server/db');
const { green, red } = require('chalk');

const {
  User,
  Game,
  Player,
  Transaction,
  Stock,
} = require('../server/db/models');
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
    await User.create({
      firstName: 'Kate',
      lastName: 'Test',
      email: 'kate@test.com',
      password: 'test',
    }),
    await User.create({
      firstName: 'Laura',
      lastName: 'Test',
      email: 'laura@test.com',
      password: 'test',
    }),
    await User.create({
      firstName: 'Jim',
      lastName: 'Test',
      email: 'jim@test.com',
      password: 'test',
    }),
    await User.create({
      firstName: 'Max',
      lastName: 'Test',
      email: 'max@test.com',
      password: 'test',
    }),
    Game.create({
      name: 'My First Game',
      startingBalance: 5000,
    }),
    Game.create({
      name: 'Fantasy Stock',
      startingBalance: 5000,
    }),
    Player.create({
      userId: 1,
      gameId: 1,
      balance: 4000,
    }),
    Player.create({
      userId: 1,
      gameId: 2,
      balance: 5000,
    }),
    Player.create({
      userId: 2,
      gameId: 1,
      balance: 3000,
    }),
    Player.create({
      userId: 3,
      gameId: 1,
      balance: 5000,
    }),
    Player.create({
      userId: 4,
      gameId: 1,
      balance: 1000,
    }),
    Player.create({
      userId: 5,
      gameId: 1,
      balance: 500,
    }),
    Transaction.create({
      type: 'buy',
      symbol: 'AAPL',
      shares: 10,
      price: 201.1,
      playerId: 1,
    }),
    Transaction.create({
      type: 'buy',
      symbol: 'AAPL',
      shares: 2,
      price: 100.1,
      playerId: 1,
    }),
    Transaction.create({
      type: 'buy',
      symbol: 'TWTR',
      shares: 20,
      price: 36.17,
      playerId: 1,
    }),
    Transaction.create({
      type: 'buy',
      symbol: 'TWTR',
      shares: 10,
      price: 36.17,
      playerId: 2,
    }),
    Stock.create({ symbol: 'AAPL', shares: 12, playerId: 1 }),
    Stock.create({ symbol: 'TWTR', shares: 20, playerId: 1 }),
    Stock.create({ symbol: 'TWTR', shares: 10, playerId: 2 }),
  ]);

  console.log(green('Seeding success!'));
  db.close();
};

seed().catch(err => {
  console.error(red('Oh noes! Something went wrong!'));
  console.error(err);
  db.close();
});
