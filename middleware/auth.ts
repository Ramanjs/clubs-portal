import passport from 'passport'

const requiresAuth = passport.authenticate('jwt', { session: false })

export default requiresAuth
