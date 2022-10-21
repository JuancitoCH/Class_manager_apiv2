const passport = require('passport')
const { Google,Facebook } = require('./passport_strategies')

passport.use(Google())
passport.use(Facebook())
passport.serializeUser((user,done)=>{done(null,user)})

module.exports = passport
