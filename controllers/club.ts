import { type Request, type Response } from 'express'
import Club from '../models/club'
import Event from '../models/event'

const getAllClubs = async (req: Request, res: Response): Promise<Response> => {
  const clubs = await Club.find()
  return res.status(200).json(clubs)
}

const getAboutInfo = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params
  const club = await Club.findOne({ handle: id }).populate({ path: 'coordinator', select: 'name email handle' }).lean()

  const events = await Event.find({ club: club?._id, status: 'APPROVED' })

  const response = {
    ...club,
    // @ts-expect-error idk
    isCoordinator: (club.coordinator != null) ? club.coordinator.handle === req.user.handle : false,
    events
  }

  return res.status(200).json(response)
}

const createClub = async (req: Request, res: Response): Promise<Response> => {
  const clubDetails = req.body

  await Club.create({
    ...clubDetails
  })

  return res.status(200).json({ success: true })
}

export { getAllClubs, getAboutInfo, createClub }
