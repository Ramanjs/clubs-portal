import express from 'express'
import { createEventRequest } from '../controllers/event'
import accessMiddleware from '../middleware/accessMiddleware'
import requiresAuth from '../middleware/auth'
import catchAsync from '../utils/catchAsync'

const router = express.Router()

router.post(
  '/requests',
  requiresAuth,
  catchAsync(accessMiddleware),
  catchAsync(createEventRequest)
)

export default router
