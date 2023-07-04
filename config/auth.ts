import dotenv from 'dotenv'
dotenv.config()

const authConfig = {
  google: {
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET
  },
  backendBaseUrl: process.env.BACKEND_URL
}

export default authConfig
