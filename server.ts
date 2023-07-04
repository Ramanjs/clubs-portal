import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import authRouter from './routes/auth'
import errorHandler from './middleware/error'

dotenv.config()

const app = express()
const port = process.env.PORT ?? 8080

app.use(express.json())
app.use(express.urlencoded())
app.use(cors())
app.use('/api/auth', authRouter)
app.use(errorHandler)

app.get('/', (req, res) => {
  res.send('Express + TypeScript Server')
})

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`)
})
