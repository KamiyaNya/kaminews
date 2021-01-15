const JWTStrategy = require('passport-jwt').Strategy
const ExstractJWT = require('passport-jwt').ExtractJwt

const JWTkey = require('../config.json').secretJWTKey
const User = require('../models/User')

const options = {
    jwtFromRequest: ExstractJWT.fromAuthHeaderAsBearerToken(),
    secretOreKey: JWTkey
}

module.exports = passport => {
    passport.use(new JWTStrategy(options, async (payload, done) => {
        const user = await User.findById({
            _id: payload.userId
        })
        if (!user) {
            done(err, false)
        }
        if (user) {
            done(null, user)
        }
    }))
}