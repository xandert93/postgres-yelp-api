import { db } from '../db/index.js'

export const createRestaurant = async (req, res) => {
  const data = req.body // => { name: 'KFC', city: 'London', price_rating: 2  }

  const {
    rows: [savedRestaurant],
  } = await db.query(
    'INSERT INTO restaurants (name, city, price_rating) values($1, $2, $3) returning *',
    [data.name, data.city, data.price_rating] // Object.values(data) wouldn't ensure this specific ordering
  )

  return res.status(201).json(savedRestaurant)
}

export const getRestaurants = async (req, res) => {
  const result = await db.query(
    'SELECT * FROM restaurants LEFT JOIN (SELECT restaurant_id, COUNT(*) as review_count, ROUND(AVG(rating), 1) as average_rating FROM reviews GROUP BY restaurant_id) reviews ON restaurants.id = reviews.restaurant_id'
  )

  return res.json(result.rows)
}

export const getRestaurantById = async (req, res) => {
  const { id } = req.params

  const {
    rows: [foundRestaurant],
  } = await db.query(
    'SELECT * FROM restaurants LEFT JOIN (SELECT restaurant_id, COUNT(*) as review_count, ROUND(AVG(rating), 1) as average_rating FROM reviews GROUP BY restaurant_id) reviews ON restaurants.id = reviews.restaurant_id WHERE id = $1',
    [id]
  )

  return res.json(foundRestaurant)
}

export const updateRestaurant = async (req, res) => {
  const { id } = req.params
  const data = req.body

  const updatesStr = Object.entries(data)
    .map((entry) => `${entry[0]} = '${entry[1]}'`)
    .join(', ') // => "name = 'Aya', city = 'London'"

  const query = `UPDATE restaurants SET ${updatesStr} WHERE id = ${id} returning *`

  const {
    rows: [updatedRestaurant],
  } = await db.query(query) // is this okay? `query` is a plain string at this point

  return res.json(updatedRestaurant)
}

export const deleteRestaurant = async (req, res) => {
  const { id } = req.params

  await db.query('DELETE FROM restaurants WHERE id = $1', [id])

  return res.sendStatus(200)
}

export const createRestaurantReview = async (req, res) => {
  const restaurantId = req.params.id
  const data = req.body

  const {
    rows: [savedReview],
  } = await db.query(
    'INSERT INTO reviews (restaurant_id, name, rating, text) values ($1, $2, $3, $4) returning *',
    [restaurantId, data.name, data.rating, data.text]
  )

  return res.status(201).json(savedReview)
}

export const getRestaurantReviews = async (req, res) => {
  const restaurantId = req.params.id

  const { rows: foundReviews } = await db.query('SELECT * FROM reviews WHERE restaurant_id = $1', [
    restaurantId,
  ])

  return res.json(foundReviews)
}
