const router = require('express').Router()
const { models: { User, Card, User_Cards, Reward }} = require('../db')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'username']
    })
    res.send(users)
  } catch (err) {
    next(err)
  }
})

// GET cards in a user's portfolio
router.get('/:userId', async (req, res, next) => {
  try {
    const userCards = await User.findOne({
      where: {
        id: req.params.userId
      },
      include: [{
        model: Card,
        include: {
          model: Reward
        }
      }],
    })
    res.send(userCards);
  } catch (error) {
    next(error)
  }
})

// POST new card for user
router.post('/:userId/:cardId', async (req, res, next) => {
  try {
    const userToUpdate = await User.findByPk(req.params.userId);
    const cardToAdd = await Card.findByPk(req.params.cardId);
    await userToUpdate.addCard(req.params.cardId);
    res.send(cardToAdd)
  } catch (error) {
    next(error)
  }
})

router.delete('/:userId/:cardId', async (req, res, next) => {
  try {
    // const userToUnassignCard = User.findByPk(req.params.userId);
    const cardToUnassign = Card.findByPk(req.params.cardId);
    // await userToUnassignCard.removeCard(req.params.cardId);
    await User_Cards.destroy({
      where: {
        userId: req.params.userId,
        cardId: req.params.cardId
      }
    })
    res.send(cardToUnassign);
  } catch (error) {
    next(error)
  }
})
