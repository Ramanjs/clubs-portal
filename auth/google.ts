import { Strategy, type VerifyCallback, type StrategyOptions, type Profile } from 'passport-google-oauth20'
import User from '../models/user'
import crypto from 'crypto'
import authConfig from '../config/auth'

const strategyOptions: StrategyOptions = {
  clientID: String(authConfig.google.clientId),
  clientSecret: String(authConfig.google.clientSecret),
  callbackURL: `${String(authConfig.backendBaseUrl)}/auth/google/callback`
}

const verify = async (accessToken: string, refreshToken: string, profile: Profile, done: VerifyCallback): Promise<void> => {
  const user = await User.findOne({ email: profile._json.email })

  if (user != null) {
    done(null, user)
    return
  }

  const firstName = String(profile._json.given_name)
  const lastName = String(profile._json.family_name)
  const uuid = crypto.randomUUID().slice(0, 6)
  const handle = `${firstName}-${lastName}-${uuid}`
  const password = crypto.randomUUID().slice(0, 6)

  let newUser = await User.create({
    email: profile._json.email,
    name: `${firstName} ${lastName}`,
    handle,
    password
  })

  // @ts-expect-error err
  newUser = newUser.toObject()
  done(null, newUser)
}

const voidVerify = (fn: any) => (accessToken: string, refreshToken: string, profile: Profile, done: VerifyCallback): void => {
  Promise.resolve(fn(accessToken, refreshToken, profile, done)).catch((err) => { done(err, false) })
}

const googleStrategy = new Strategy(
  strategyOptions,
  voidVerify(verify)
)

export default googleStrategy
