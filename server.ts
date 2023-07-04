import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import passport from 'passport'
import authRouter from './routes/auth'
import errorHandler from './middleware/error'
import googleStrategy from './auth/google'
import connect from './database/mongodbConnection'
import morgan from 'morgan'

dotenv.config()

const app = express()
const port = process.env.PORT ?? 8080
const logger = morgan('dev')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

passport.use('google', googleStrategy)
app.use(logger)

void connect()

app.use('/auth', authRouter)
app.use(errorHandler)

app.get('/', (req, res) => {
  res.send('Express + TypeScript Server')
})

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`)
})
