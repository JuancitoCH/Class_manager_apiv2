require('dotenv')
	.config({
		path:require('path')
			.join(__dirname,'..','..','.env')
	})

module.exports = {
	port:process.env.PORT,
	jwt_secret:process.env.JWT_SECRET,
	node_mode:process.env.NODE_ENV,
}