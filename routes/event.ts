import express from 'express'
import { getAllEvents, approveEventRequest, createEventRequest, getEventInfo, rejectEventRequest } from '../controllers/event'
import accessMiddleware from '../middleware/accessMiddleware'
import requiresAuth from '../middleware/auth'
import catchAsync from '../utils/catchAsync'

const router = express.Router()

router.get(
  '/',
  catchAsync(getAllEvents)
)

router.get(
  '/:id',
  catchAsync(getEventInfo)
)

router.post(
  '/requests',
  requiresAuth,
  catchAsync(accessMiddleware),
  catchAsync(createEventRequest)
)

router.post(
  '/requests/:id',
  requiresAuth,
  catchAsync(accessMiddleware),
  catchAsync(approveEventRequest)
)

router.delete(
  '/requests/:id',
  requiresAuth,
  catchAsync(accessMiddleware),
  catchAsync(rejectEventRequest)
)

export default router
