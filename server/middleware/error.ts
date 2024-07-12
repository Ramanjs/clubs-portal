import { type Request, type Response, type NextFunction } from 'express'
import ApiError from '../utils/APIError'

const errConverter = (err: ApiError): ApiError => {
  if (!(err instanceof ApiError)) {
    const message = 'Something went wrong'
    const statusCode = 500
    return new ApiError(message, statusCode)
  }
  return err
}

const errorHandler = (err: ApiError, req: Request, res: Response, next: NextFunction): Response => {
  console.log(err)
  const { statusCode, message } = errConverter(err)
  const response = {
    code: statusCode,
    message
  }
  return res.status(statusCode).json(response)
}

export default errorHandler
