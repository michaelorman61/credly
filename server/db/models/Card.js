const Sequelize = require('sequelize');
const db = require('../db');

const Card = db.define('card', {
  name: {
    type: Sequelize.STRING
  },
  company: {
    type: Sequelize.ENUM('Bank of America', 'Chase', 'Citibank', 'Capital One', 'American Express', 'TD Bank')
  },
  imageUrl: {
    type: Sequelize.TEXT,
    defaultValue: "https://bit.ly/2VqAWZp"
  }
})

module.exports = Card
