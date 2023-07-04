import express from 'express'
import { login } from '../controllers/auth'
import catchAsync from '../utils/catchAsync'

const router = express.Router()

router.get(
  '/login',
  catchAsync(login)
)

export default router
