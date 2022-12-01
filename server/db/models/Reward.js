const Sequelize = require('sequelize');
const db = require('../db');

const Reward = db.define('reward', {
  transactionType: {
    type: Sequelize.ENUM('all', 'dining', 'gas', 'online shopping', 'travel', 'groceries', 'entertainment', 'streaming services')
  },
  rewardType: {
    type: Sequelize.ENUM('points', 'cash back', 'miles')
  },
  rewardAmount: {
    type: Sequelize.FLOAT
  }
})

module.exports = Reward;
