const mongoose = require('mongoose')

const Crafting_components_Schema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  weight: {
    type: Number,
    required: true
  },
  rarity: {
    type: String,
    required: true
  },
  baseID: {
    type: String,
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: Date
})

module.exports = mongoose.model(
  'Crafting_components',
  Crafting_components_Schema
)
