const JWTStrategy = require('passport-jwt').Strategy
const ExstractJWT = require('passport-jwt').ExtractJwt

const JWTkey = require('../config.json').secretJWTKey
const User = require('../models/User')

const options = {
    jwtFromRequest: ExstractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: JWTkey
}


module.exports = passport => {
    passport.use(new JWTStrategy(options, async (payload, done) => {
        const user = await User.findById(payload.userId).select('email id')
        if (!user) {
            return done(null, false)
        }
        if (user) {
            return done(null, user)
        }
    }))
}