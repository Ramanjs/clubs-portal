import express from 'express'
import catchAsync from '../utils/catchAsync'
import { getAllClubs, getAboutInfo, createClubRequest, approveClubRequest, rejectClubRequest, updateClubDetails } from '../controllers/club'
import requiresAuth from '../middleware/auth'
import accessMiddleware from '../middleware/accessMiddleware'

const router = express.Router()

router.get(
  '/',
  catchAsync(getAllClubs)
)

router.get(
  '/:id',
  requiresAuth,
  catchAsync(getAboutInfo)
)

router.post(
  '/:id',
  requiresAuth,
  catchAsync(accessMiddleware),
  catchAsync(updateClubDetails)
)

router.post(
  '/requests',
  requiresAuth,
  catchAsync(accessMiddleware),
  catchAsync(createClubRequest)
)

router.post(
  '/requests/:id',
  requiresAuth,
  catchAsync(accessMiddleware),
  catchAsync(approveClubRequest)
)

router.delete(
  '/requests/:id',
  requiresAuth,
  catchAsync(accessMiddleware),
  catchAsync(rejectClubRequest)
)

export default router
