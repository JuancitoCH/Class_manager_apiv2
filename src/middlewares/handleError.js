module.exports = (error,req,res,next) => {
	console.log(error)
	return res.status(500).json({
		success:false,
		error:{
			message: error.message ? error.message : 'Server Error Ocurred'
		}
	})
}