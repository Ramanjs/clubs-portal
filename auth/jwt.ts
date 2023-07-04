import { Strategy, type VerifiedCallback } from 'passport-jwt'
import User from '../models/user'
import { tokenExtractor } from './token'
import authConfig from '../config/auth'

const verifyCallback = async (payload: any, done: VerifiedCallback): Promise<void> => {
  if (payload.type !== authConfig.tokenTypes.accessToken) {
    done(null, false)
    return
  }

  const user = await User.findOne({ email: payload.email })

  if (user == null) {
    done('Invalid token', false)
  } else {
    done(null, user)
  }
}

const voidVerifyCallback = (fn: any) => (payload: any, done: VerifiedCallback) => {
  Promise.resolve(fn(payload, done)).catch((err) => { done(err, false) })
}

const jwtStrategy = new Strategy({
  jwtFromRequest: tokenExtractor,
  secretOrKey: authConfig.accessTokenSecret
}, voidVerifyCallback(verifyCallback)
)

export default jwtStrategy
