const router = require('express').Router()
const { models: { Card, Reward }} = require('../db')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const cards = await Card.findAll({ include: Reward});
    res.send(cards);
  } catch (err) {
    next(err)
  }
})

router.get('/:companyName', async (req, res, next) => {
  try {
    const companyCards = await Card.findAll({
      where: {
        userId: null,
        company: req.params.companyName
      }
    });
    res.send(companyCards)
  } catch (error) {
    next(error)
  }
})

// POST create a new card that will be based of the card template
router.post('/:cardId', async (req, res, next) => {
  try {
    const cardToDupe = await Card.findOne({
      where: {
      id: req.params.cardId}});
    console.log("CARD TO DUPE", cardToDupe)
    const newCard = await Card.create({
      name: cardToDupe.name,
      company: cardToDupe.company,
      imageUrl: cardToDupe.imageUrl
    });
    console.log("NEW CARD", newCard)
    res.send(newCard);
  } catch (error) {
    next(error)
  }
})
