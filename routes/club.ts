import express from 'express'
import catchAsync from '../utils/catchAsync'
import { getAllClubs, getAboutInfo } from '../controllers/club'

const router = express.Router()

router.get(
  '/',
  catchAsync(getAllClubs)
)

router.get(
  '/:id',
  catchAsync(getAboutInfo)
)

export default router
