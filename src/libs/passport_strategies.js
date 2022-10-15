const GoogleStrategy = require('passport-google-oauth20').Strategy
const { 
	GOOGLE_CLIENT_ID,
	GOOGLE_CLIENT_SECRET,
	GOOGLE_CALLBACK_URL
} = require('../config/')


const Google= ()=> new GoogleStrategy({
	clientID: GOOGLE_CLIENT_ID,
	clientSecret: GOOGLE_CLIENT_SECRET,
	callbackURL: GOOGLE_CALLBACK_URL,
	scope: ['profile','email'] 
},function (accessToken, refreshToken, profile, cb){
	return cb(null,{profile})
})

module.exports = {
	Google
}