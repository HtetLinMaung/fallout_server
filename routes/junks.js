const express = require('express')
const Junks = require('../models/Junks')
const CraftingJunk = require('../models/Crafting_Junk')

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

    const { name, weight, baseID, components } = req.body

    const junk = new Junks({
      name,
      weight,
      baseID
    })

    const junk_res = await junk.save()
    let component = null
    for (const [component_id, quantity] of Object.entries(components)) {
      component = new CraftingJunk({
        junk_id: junk_res._id,
        component_id,
        quantity
      })
      const transition_res = await component.save()
    }

    res.status(200).json({ ...junk_res, ...transition_res })
  } catch (err) {
    res.status(500).json({ msg: err })
  }
})

module.exports = router
