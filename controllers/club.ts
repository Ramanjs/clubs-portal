import { type Request, type Response } from 'express'
import Club from '../models/club'

const getAllClubs = async (req: Request, res: Response): Promise<Response> => {
  const clubs = await Club.find()
  return res.status(200).json(clubs)
}

const getAboutInfo = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params
  const club = await Club.findOne({ handle: id }).populate({ path: 'coordinator', select: 'name email handle' }).lean()

  const response = {
    ...club,
    // @ts-expect-error idk
    isCoordinator: club.coordinator.handle === req.user.handle
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
