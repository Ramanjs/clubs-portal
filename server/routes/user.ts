import express from 'express'
import catchAsync from '../utils/catchAsync'
import { getUserInfo } from '../controllers/user'

const router = express.Router()

router.get(
  '/:id',
  catchAsync(getUserInfo)
)

export default router
