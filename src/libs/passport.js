const passport = require('passport')
const { Google } = require('./passport_strategies')

passport.use(Google())
passport.serializeUser((user,done)=>{done(null,user)})

module.exports = passport
