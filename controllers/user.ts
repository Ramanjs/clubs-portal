import { type Request, type Response } from 'express'

import User from '../models/user'

const getUserInfo = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params
  const user = await User.findOne({ handle: id })

  return res.status(200).json(user)
}

export { getUserInfo }
