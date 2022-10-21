require('dotenv')
	.config({
		path:require('path')
			.join(__dirname,'..','..','.env')
	})

module.exports = {
	port:process.env.PORT,
	jwt_secret:process.env.JWT_SECRET,
	node_mode:process.env.NODE_ENV,

	GOOGLE_CLIENT_ID:process.env.GOOGLE_CLIENT_ID,
	GOOGLE_CLIENT_SECRET:process.env.GOOGLE_CLIENT_SECRET,
	GOOGLE_CALLBACK_URL:process.env.GOOGLE_CALLBACK_URL,

	FACEBOOK_CLIENT_ID:process.env.FACEBOOK_CLIENT_ID,
	FACEBOOK_CLIENT_SECRET:process.env.FACEBOOK_CLIENT_SECRET,
	FACEBOOK_CALLBACK_URL:process.env.FACEBOOK_CALLBACK_URL,
}