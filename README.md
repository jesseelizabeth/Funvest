# Funvest
A web based stock trading game. Leveraging IEX Cloud API, users can analyze stock performance to make educated stock trading decisions and compete on the leaderboard.

### Prerequisite
* Will need to sign up for your own API key with ```IEX Cloud```
* Create a file called ```secrets.js``` in the root of the project
```
const token = API_KEY_HERE
module.exports = token
```

## Installation
* Clone this repository
* ```npm install```
* Create a Postgres database called ```Funvest```
* ```npm run seed```
* ```npm run start-dev```
* app will be running on ```http://localhost:8080/```

## Built with
* ```Node.js```, ```Express```, ```PostgreSQL```, ```Sequelize```
* ```Passport``` for authentication
* ```IEX Cloud API```

## View deployed app at ```https://playfunvest.herokuapp.com```
