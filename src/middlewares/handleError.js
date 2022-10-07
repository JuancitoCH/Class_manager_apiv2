module.exports = (eror,req,res,next) => {
	return res.status(404).json({
		success:false,
		error:{
			message: eror.message
		}
	})
}