const express = require('express')
const router = express.Router()

const CraftingJunk = require('../models/Crafting_Junk')

router.get('/', async (req, res) => {
  try {
    const crafting_junks = await CraftingJunk.find()
    res.json(crafting_junks)
  } catch (err) {
    res.status(500).json({ msg: err })
  }
})

module.exports = router
