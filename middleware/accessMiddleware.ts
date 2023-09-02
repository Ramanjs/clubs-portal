import { type Request, type Response, type NextFunction } from 'express'
import Club from '../models/club'
import accessLevel from '../config/user'

const accessMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { id: handle } = req.params

  let isCoordinator

  if (req.user != null) {
    // @ts-expect-error idk
    isCoordinator = await Club.findOne({ coordinator: req.user._id })
    // @ts-expect-error idk
    if (req.user.isClubsCoordinator === true) {
      // @ts-expect-error idk
      req.user.accessLevel = accessLevel.CLUBS_COORDINATOR
    } else if (isCoordinator != null) {
      // @ts-expect-error idk
      req.user.accessLevel = accessLevel.COORDINATOR
      // @ts-expect-error idk
    } else if (req.user.handle === handle) {
      // @ts-expect-error idk
      req.user.accessLevel = accessLevel.USER
    } else {
      req.user = { accessLevel: accessLevel.LOGGEDIN_USER }
    }
  } else {
    req.user = { accessLevel: accessLevel.LOGGEDIN_USER }
  }

  next()
}

export default accessMiddleware
