import { type Request, type Response } from 'express'
import User from '../models/user'
import Club from '../models/club'
import Event from '../models/event'

const createEventRequest = async (req: Request, res: Response): Promise<Response> => {
  const data = req.body
  data.status = 'PENDING'
  // @ts-expect-error idk
  const coordinator = await User.findOne({ handle: req.user.handle })
  data.coordinator = coordinator?._id

  const club = await Club.findOne({ handle: data.clubHandle })
  data.club = club?._id

  await Event.create(data)

  return res.status(200).json({ success: true })
}

export { createEventRequest }
