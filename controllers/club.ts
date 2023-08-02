import { type Request, type Response } from 'express'
import Club from '../models/club'

const getAllClubs = async (req: Request, res: Response): Promise<Response> => {
  const clubs = await Club.find()
  return res.status(200).json(clubs)
}

const getAboutInfo = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params
  const club = await Club.findOne({ handle: id }).populate('coordinator')

  return res.status(200).json(club)
}

const createClub = async (req: Request, res: Response): Promise<Response> => {
  const clubDetails = req.body

  await Club.create({
    ...clubDetails
  })

  return res.status(200).json({ success: true })
}

export { getAllClubs, getAboutInfo, createClub }
