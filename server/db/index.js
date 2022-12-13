//this is the access point for all things database related!

const db = require('./db')

const User = require('./models/User');
const Card = require('./models/Card');
const Reward = require('./models/Reward')

const User_Cards = db.define('User_Cards', {

})

//associations could go here!
User.belongsToMany(Card, {through: User_Cards});
Card.belongsToMany(User, {through: User_Cards});

Card.hasMany(Reward);
Reward.belongsTo(Card);


module.exports = {
  db,
  models: {
    User,
    Card,
    Reward,
    User_Cards
  },
}
