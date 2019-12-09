const mongoose = require('mongoose')

const JunksSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  weight: {
    type: Number,
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

module.exports = mongoose.model('Junks', JunksSchema)
