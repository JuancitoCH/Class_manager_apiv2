const jwt = require('jsonwebtoken')
const {jwt_secret} = require('../config/')

module.exports = (permissions)=>{
	return (req,res,next)=>{
		const {token} = req.cookies
		try{
			const user_data = jwt.verify(token,jwt_secret)
			if(!permissions.includes(user_data.permissions)) return res
				.status(300).json({
					success:false,
					message:'User Don\'t have permissions'
				})
			req.user_data = user_data
			return next()
			
		}catch(err){
			console.log(err)
			return res.status(400).json({
				success:false,
				error:{
					message:err.message
				}
			})
		}
	}
}