import { type Request, type Response } from 'express'
import accessLevel from '../config/user'
import User from '../models/user'
import Club from '../models/club'
import Event from '../models/event'

const getAllClubs = async (req: Request, res: Response): Promise<Response> => {
  const clubs = await Club.find({ status: 'APPROVED' })
  return res.status(200).json(clubs)
}

const updateClubDetails = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params
  // @ts-expect-error idk
  if (req.user.accessLevel <= accessLevel.CLUBS_COORDINATOR) {
    const club = await Club.findOne({ handle: id })
    const clubDetails = req.body
    console.log(clubDetails)
    // @ts-expect-error idk
    club.name = clubDetails.name
    // @ts-expect-error idk
    club.description = clubDetails.description
    // @ts-expect-error idk
    club.email = clubDetails.email

    // @ts-expect-error idk
    await Club.updateOne({ handle: id }, club)
    return res.status(200).json({})
  }

  return res.status(400).json({})
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

const createClubRequest = async (req: Request, res: Response): Promise<Response> => {
  const clubDetails = req.body
  clubDetails.status = 'PENDING'

  // @ts-expect-error idk
  const coordinator = await User.findOne({ handle: req.user.handle })

  clubDetails.coordinator = coordinator?._id
  await Club.create({
    ...clubDetails
  })

  return res.status(200).json({ success: true })
}

const approveClubRequest = async (req: Request, res: Response): Promise<Response> => {
  const { id: handle } = req.params
  // @ts-expect-error idk
  if (req.user.accessLevel <= accessLevel.CLUBS_COORDINATOR) {
    const club = await Club.findOne({ handle }).lean()
    console.log(club)
    // @ts-expect-error tdk
    club.status = 'APPROVED'
    // @ts-expect-error tdk
    await Club.updateOne({ handle }, club)
    return res.status(200).json({})
  }

  return res.status(403).json({})
}

const rejectClubRequest = async (req: Request, res: Response): Promise<Response> => {
  const { id: handle } = req.params
  // @ts-expect-error idk
  if (req.user.accessLevel <= accessLevel.CLUBS_COORDINATOR) {
    const club = await Club.findOne({ handle }).lean()
    console.log(club)
    // @ts-expect-error tdk
    club.status = 'REJECTED'
    // @ts-expect-error tdk
    await Club.updateOne({ handle }, club)
    return res.status(200).json({})
  }

  return res.status(403).json({})
}

export { getAllClubs, getAboutInfo, createClubRequest, approveClubRequest, rejectClubRequest, updateClubDetails }
