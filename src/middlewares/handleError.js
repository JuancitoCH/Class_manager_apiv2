module.exports = (error,req,res,next) => {
	console.log(error)
	return res.status(404).json({
		success:false,
		error:{
			message: error.message
		}
	})
}