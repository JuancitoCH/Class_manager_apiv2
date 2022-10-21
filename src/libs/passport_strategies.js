const GoogleStrategy = require('passport-google-oauth20').Strategy
const FacebookStrategy = require('passport-facebook').Strategy
const { 
	GOOGLE_CLIENT_ID,
	GOOGLE_CLIENT_SECRET,
	GOOGLE_CALLBACK_URL,
	FACEBOOK_CLIENT_ID,
	FACEBOOK_CLIENT_SECRET,
	FACEBOOK_CALLBACK_URL,
} = require('../config/')


const Google= ()=> new GoogleStrategy({
	clientID: GOOGLE_CLIENT_ID,
	clientSecret: GOOGLE_CLIENT_SECRET,
	callbackURL: GOOGLE_CALLBACK_URL,
	scope: ['profile','email'] 
},function (accessToken, refreshToken, profile, cb){
	return cb(null,{profile})
})

const Facebook= ()=> new FacebookStrategy({
	clientID: FACEBOOK_CLIENT_ID,
	clientSecret: FACEBOOK_CLIENT_SECRET,
	callbackURL: FACEBOOK_CALLBACK_URL,
	scope:['email','public_profile'],
	profileFields: ['displayName','email']
},function (accessToken, refreshToken, profile, cb){
	// console.log(profile)
	return cb(null,{profile})
})

module.exports = {
	Google,
	Facebook,
}