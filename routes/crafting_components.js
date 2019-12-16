const express = require('express');
const Crafting_components = require('../models/Crafting_components');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const crafting_components = await Crafting_components.find();
    res.json(crafting_components);
  } catch (err) {
    res.status(500).json({ msg: err });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const crafting_component = await Crafting_components.findById(
      req.params.id
    );
    res.json(crafting_component);
  } catch (err) {
    res.status(500).json({ msg: err });
  }
});

router.post('/', async (req, res) => {
  try {
    for (const [key, value] of Object.entries(req.body)) {
      
      if (!value)
        return res.status(400).json({ msg: 'Fields must not be null!' });
    }

    const { name, weight, rarity, baseID } = req.body;

    const component = new Crafting_components({
      name,
      weight,
      rarity,
      baseID
    });

    const response = await component.save();
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({ msg: err });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const response = await Crafting_components.deleteOne({
      _id: req.params.id
    });
    res.status(401).json(response);
  } catch (err) {
    res.status(500).json({ msg: err });
  }
});

module.exports = router;
