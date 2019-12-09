const express = require('express')
const Crafting_components = require('../models/Crafting_components')
const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const response = await Crafting_components.find()
    res.json(response)
  } catch (err) {
    res.status(500).json({ msg: err })
  }
})

router.post('/', async (req, res) => {
  try {
    for (const [key, value] of Object.entries(req.body)) {
      if (!value)
        return res.status(400).json({ msg: 'Fields must not be null!' })
    }

    const { name, weight, rarity, baseID } = req.body

    const component = new Crafting_components({
      name,
      weight,
      rarity,
      baseID
    })

    const response = await component.save()
    res.status(200).json(response)
  } catch (err) {
    res.status(500).json({ msg: err })
  }
})

module.exports = router
