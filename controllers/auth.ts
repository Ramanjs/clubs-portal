import { type Request, type Response } from 'express'

const login = async (req: Request, res: Response): Promise<Response> => {
  return res.status(200).json('login success!')
}

export { login }
