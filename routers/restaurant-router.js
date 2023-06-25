import express from 'express'
import {
  createRestaurant,
  createRestaurantReview,
  deleteRestaurant,
  getRestaurantById,
  getRestaurantReviews,
  getRestaurants,
  updateRestaurant,
} from '../controllers/restaurant-controller.js'

const restaurantRouter = express.Router()

restaurantRouter.route('/').get(getRestaurants).post(createRestaurant)

restaurantRouter
  .route('/:id')
  .get(getRestaurantById) // just because IDK if there will be other ways to query a single restaurant yet e.g. name, slug? etc.
  .patch(updateRestaurant)
  .delete(deleteRestaurant)

restaurantRouter.route('/:id/reviews').get(getRestaurantReviews).post(createRestaurantReview)

export default restaurantRouter
