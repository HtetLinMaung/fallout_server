const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

require('dotenv').config()
const PORT = process.env.PORT || 5000

const app = express()
app.use(cors())

mongoose.connect(
  process.env.DB_CONNECTION,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log('DB Connected successfully')
)

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api/crafting_components', require('./routes/crafting_components'))



app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
