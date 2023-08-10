import express from 'express'
import catchAsync from '../utils/catchAsync'
import { getAllClubs, getAboutInfo, createClub } from '../controllers/club'
import requiresAuth from '../middleware/auth'

const router = express.Router()

router.get(
  '/',
  catchAsync(getAllClubs)
)

router.post(
  '/',
  requiresAuth,
  catchAsync(createClub)
)

router.get(
  '/:id',
  requiresAuth,
  catchAsync(getAboutInfo)
)

export default router
