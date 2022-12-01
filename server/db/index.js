//this is the access point for all things database related!

const db = require('./db')

const User = require('./models/User');
const Card = require('./models/Card');
const Reward = require('./models/Reward')

//associations could go here!
User.hasMany(Card);
Card.belongsTo(User);

Card.hasMany(Reward);
Reward.belongsTo(Card);


module.exports = {
  db,
  models: {
    User,
    Card,
    Reward
  },
}
