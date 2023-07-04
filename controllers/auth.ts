import { type Request, type Response } from 'express'
import { getAuthenticationToken } from '../auth/token'

const oauthCallback = async (req: Request, res: Response): Promise<Response> => {
  const { accessToken, refreshToken } = getAuthenticationToken(req.user)
  return res.status(200).json({
    accessToken,
    refreshToken
  })
}

export { oauthCallback }
