import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import passport from 'passport'
import authRouter from './routes/auth'
import clubRouter from './routes/club'
import userRouter from './routes/user'
import eventRouter from './routes/event'
import errorHandler from './middleware/error'
import googleStrategy from './auth/google'
import connect from './database/mongodbConnection'
import morgan from 'morgan'
import jwtStrategy from './auth/jwt'

dotenv.config()

export const app = express()
const logger = morgan('dev')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

passport.use('jwt', jwtStrategy)
passport.use('google', googleStrategy)
app.use(logger)

void connect()

app.use('/auth', authRouter)
app.use('/clubs', clubRouter)
app.use('/users', userRouter)
app.use('/events', eventRouter)
app.use(errorHandler)

app.get('/', (req, res) => {
  res.send('Express + TypeScript Server')
})
