import express from 'express'
import cors from 'cors'

import restaurantRouter from './routers/restaurant-router.js'
import reviewRouter from './routers/review-router.js'

const { NODE_ENV, PORT } = process.env

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/restaurants', restaurantRouter)
app.use('/api/reviews', reviewRouter)

const server = app.listen(PORT, () =>
  console.log(`♨️  Express Server: running! (${NODE_ENV} on:${PORT})`)
)
