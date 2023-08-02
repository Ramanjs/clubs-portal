import { type Request, type Response } from 'express'
import accessLevel from '../config/user'
import crypto from 'crypto'
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
  const uuid = crypto.randomUUID().slice(0, 6)
  data.handle = uuid
  data.club = club?._id

  await Event.create(data)

  return res.status(200).json({ success: true })
}

const approveEventRequest = async (req: Request, res: Response): Promise<Response> => {
  const { id: handle } = req.params

  // @ts-expect-error tdk
  if (req.user.accessLevel <= accessLevel.CLUBS_COORDINATOR) {
    const event = await Event.findOne({ handle }).lean()
    console.log(event)
    // @ts-expect-error tdk
    event.status = 'APPROVED'
    // @ts-expect-error tdk
    await Event.updateOne({ handle }, event)
  }

  return res.status(200).json({})
}

const rejectEventRequest = async (req: Request, res: Response): Promise<Response> => {
  const { id: handle } = req.params

  // @ts-expect-error tdk
  if (req.user.accessLevel <= accessLevel.CLUBS_COORDINATOR) {
    const event = await Event.findOne({ handle }).lean()
    // @ts-expect-error tdk
    event.status = 'REJECTED'
    // @ts-expect-error tdk
    await Event.updateOne({ handle }, event)
  }

  return res.status(200).json({})
}

export { createEventRequest, approveEventRequest, rejectEventRequest }
