import { type Request, type Response } from 'express'
import Club from '../models/club'

const getAllClubs = async (req: Request, res: Response): Promise<Response> => {
  const clubs = Club.find({})
  return res.status(200).json(clubs)
}

const createClub = async (req: Request, res: Response): Promise<Response> => {
  const clubDetails = req.body

  await Club.create({
    ...clubDetails
  })

  return res.status(200).json({ success: true })
}

export { getAllClubs, createClub }
