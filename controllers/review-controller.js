import { db } from '../db/index.js'

export const updateRestaurantReview = async (req, res) => {
  const { id } = req.params
}

export const deleteRestaurantReview = async (req, res) => {
  const { id } = req.params

  await db.query('DELETE FROM reviews WHERE id = $1', [id])

  return res.sendStatus(200)
}
