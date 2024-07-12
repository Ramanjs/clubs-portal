import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

const connect = async (): Promise<mongoose.Connection> => {
  await mongoose.connect(String(process.env.MONGO_URL))
  const db = mongoose.connection
  db.on('error', console.error.bind(console, 'connection error'))
  console.log('DB connection succeded')
  return db
}

export default connect
