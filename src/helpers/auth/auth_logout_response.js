module.exports=(res)=>{
	return res.clearCookie('token').status(200)
		.json({
			success:true,
			code:200,
			message:'Logout Successfully'
		})
}