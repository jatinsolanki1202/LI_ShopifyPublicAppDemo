const express = require('express')
require('dotenv').config()
const dbConnection = require('./config/db.js')
const authRoutes = require('./routes/auth.routes.js')
const webhookRoutes = require('./routes/webhook.routes.js')

const app = express()
dbConnection()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/auth', authRoutes)
app.use('/webhook', webhookRoutes)

app.get('/', (req, res) => {
  res.send("working")
})

app.listen(process.env.PORT, () => console.log(`server running on port ${process.env.PORT}`))