const mongoose = require('mongoose')

const CraftingJunkSchema = mongoose.Schema({
  component_id: {
    type: String,
    required: true
  },
  junk_id: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    default: 0
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: Date
})

module.exports = mongoose.model('CraftingJunk', CraftingJunkSchema)
