import { type Request, type Response } from 'express'
import { getAuthenticationToken } from '../auth/token'
import authConfig from '../config/auth'

const oauthCallback = async (req: Request, res: Response): Promise<void> => {
  const { accessToken } = getAuthenticationToken(req.user)
  // @ts-expect-error idk
  res.redirect(String(authConfig.frontendBaseUrl) + '/login/success?accessToken=' + accessToken + '&handle=' + String(req.user.handle))
}

export { oauthCallback }
