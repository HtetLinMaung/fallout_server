const express = require('express')
const Junks = require('../models/Junks')

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const junks = await Junks.find()
    res.json(junks)
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

    const { name, weight, baseID } = req.body

    const junk = new Junks({
      name,
      weight,
      baseID
    })
  } catch (err) {
    res.status(500).json({ msg: err })
  }
})

module.exports = router
