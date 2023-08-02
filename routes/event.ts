import express from 'express'
import { approveEventRequest, createEventRequest, rejectEventRequest } from '../controllers/event'
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

router.post(
  '/requests/:handle',
  requiresAuth,
  catchAsync(accessMiddleware),
  catchAsync(approveEventRequest)
)

router.delete(
  '/requests/:handle',
  requiresAuth,
  catchAsync(accessMiddleware),
  catchAsync(rejectEventRequest)
)

export default router
