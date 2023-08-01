import jwt from 'jsonwebtoken'
import { type Request, type Response } from 'express'
import authConfig from '../config/auth'
import ApiError from '../utils/APIError'

const tokenExtractor = (req: Request): string | null => {
  const authHeader = req.headers.authorization

  if (authHeader != null && authHeader !== '' && authHeader !== 'Bearer') {
    const accessToken = authHeader.split(' ')[1]
    return accessToken
  }

  return null
}

const getAuthenticationToken = (user: any): {
  accessToken: string
  refreshToken: string
} => {
  const accessToken = jwt.sign({
    email: user.email,
    type: authConfig.tokenTypes.accessToken,
    name: user.name,
    id: user._id,
    handle: user.handle
  }, String(authConfig.accessTokenSecret), {
    expiresIn: '30d'
  })

  const refreshToken = jwt.sign({
    email: user.email,
    type: authConfig.tokenTypes.refreshToken,
    name: user.name,
    id: user._id,
    handle: user.handle
  }, String(authConfig.refreshTokenSecret), {
    expiresIn: '7d'
  })

  return { accessToken, refreshToken }
}

const getAccessToken = (refreshToken: string, req: Request, res: Response): string => {
  try {
    const {
      // @ts-expect-error idk
      email, name, id, handle
    } = jwt.verify(refreshToken, String(authConfig.refreshTokenSecret))

    const accessToken = jwt.sign({
      email,
      type: authConfig.tokenTypes.accessToken,
      name,
      id,
      handle
    }, String(authConfig.accessTokenSecret), {
      expiresIn: '30d'
    })

    return accessToken
  } catch (err) {
    throw new ApiError('Invalid refresh token', 401)
  }
}

export { tokenExtractor, getAuthenticationToken, getAccessToken }
