const jwt = require('jsonwebtoken')
const {
	jwt_secret,
	node_mode
} = require('../../config')

module.exports = async (
	res,
	res_data
) => {
	const {
		code,
		success,
		message,
		data:user,
		token } = res_data
	
	if(!token) return res.json({ success, message, user })
	let exp
	try {
		exp = jwt.verify(token, jwt_secret).exp
	} catch (error) {
		return res.status(500).json({
			success:false,
			code:500,
			error:{
				message:error.message
			}
		})
	}
	return res
		.status(code)
		.cookie('token', token, {
			httpOnly: true,
			// comprobamos el modo de el server ( dev )
			...(node_mode!=='develpment')&&( {
				secure:true,
				sameSite:'none' }),
			expires: new Date(exp * 1000),
		})
		.json({ success, message, user })
}