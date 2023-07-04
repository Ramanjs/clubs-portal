import { type Request, type Response } from 'express'

const login = async (req: Request, res: Response): Promise<Response> => {
  return res.status(200).json('login success!')
}

const oauthCallback = async (req: Request, res: Response): Promise<Response> => {
  const token = req.user
  console.log(token)
  return res.status(200).json(token)
}

export { login, oauthCallback }
