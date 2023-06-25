import express from 'express'

import { deleteRestaurantReview, updateRestaurantReview } from '../controllers/review-controller.js'

const reviewRouter = express.Router()

reviewRouter.route('/:id').patch(updateRestaurantReview).delete(deleteRestaurantReview)

export default reviewRouter
