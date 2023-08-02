import { type Request, type Response } from 'express'
import Event from '../models/event'
import User from '../models/user'

const getUserInfo = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params
  const user = await User.findOne({ handle: id }).lean()

  const events = await Event.find({ coordinator: user?._id }).lean()

  const response = user
  // @ts-expect-error idk
  response.requests = events

  if (user?.isClubsCoordinator === true) {
    // @ts-expect-error idk
    response.pendingRequests = await Event.find({ status: 'PENDING' })
  }

  return res.status(200).json(response)
}

export { getUserInfo }
