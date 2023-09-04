import { type Request, type Response } from 'express'
import Club from '../models/club'
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

  const registrations = await Event.find({ participants: user?._id }).select('name handle start end venue')

  // @ts-expect-error idk
  response.isCoordinator = (await Club.find({ coordinator: user?._id })) != null

  // @ts-expect-error idk
  response.registrations = registrations
  return res.status(200).json(response)
}

export { getUserInfo }
