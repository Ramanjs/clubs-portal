import express from 'express'
import passport from 'passport'
import { oauthCallback } from '../controllers/auth'
import catchAsync from '../utils/catchAsync'

const router = express.Router()

router.get(
  '/google',
  passport.authenticate('google', { scope: ['email', 'profile'] })
)

router.get(
  '/google/callback',
  passport.authenticate('google', {
    session: false
  }),
  catchAsync(oauthCallback)
)

export default router
