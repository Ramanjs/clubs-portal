import dotenv from 'dotenv'
dotenv.config()

const authConfig = {
  accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
  refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET,
  google: {
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET
  },
  tokenTypes: {
    accessToken: 'access-token',
    refreshToken: 'refresh-token'
  },
  frontendBaseUrl: process.env.FRONTEND_URL,
  backendBaseUrl: process.env.BACKEND_URL
}

export default authConfig
