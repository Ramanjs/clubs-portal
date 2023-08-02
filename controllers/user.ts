import { type Request, type Response } from 'express'
import Event from '../models/event'
import User from '../models/user'

const getUserInfo = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params
  const user = await User.findOne({ handle: id }).lean()

  const events = await Event.find({ coordinator: user?._id }).lean()
  // @ts-expect-error idk
  user.requests = events

  return res.status(200).json(user)
}

export { getUserInfo }
