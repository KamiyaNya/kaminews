const JWTStrategy = require('passport-jwt').Strategy
const ExstractJWT = require('passport-jwt').ExtractJwt

const JWTkey = require('../config.json').secretJWTKey

const options = {
    jwtFromRequest: ExstractJWT.fromAuthHeaderAsBearerToken(),
    secretOreKey: JWTkey
}

module.exports = passport = (req, res) => {

}