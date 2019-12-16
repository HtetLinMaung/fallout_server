const express = require('express');
const Junks = require('../models/Junks');
const CraftingJunk = require('../models/Crafting_Junk');
const Crafting_components = require('../models/Crafting_components');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const junks = await Junks.find();
    res.json(junks);
  } catch (err) {
    res.status(500).json({ msg: err });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const junk = await Junks.findById(req.params.id);
    res.json(junk);
  } catch (err) {
    res.status(500).json({ msg: err });
  }
});

router.post('/', async (req, res) => {
  try {
    for (const [key, value] of Object.entries(req.body)) {
      if (key == 'weight' && value == 0) {
        continue;
      }
      if (!value)
        return res.status(400).json({ msg: 'Fields must not be null!' });
    }

    const { name, weight, baseID, components } = req.body;

    const junk = new Junks({
      name,
      weight,
      baseID
    });

    const junk_res = await junk.save();
    let component = null;
    const crafting_components = await Crafting_components.find();
    for (const [component_name, quantity] of Object.entries(components)) {
      component = new CraftingJunk({
        junk_id: junk_res._id,
        component_id: crafting_components.find(v => v.name == component_name)
          ._id,
        quantity
      });
      const transition_res = await component.save();
    }

    res.status(200).json(junk);
  } catch (err) {
    res.status(500).json({ msg: err });
  }
});

module.exports = router;
