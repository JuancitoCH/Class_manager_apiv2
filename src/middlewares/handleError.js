module.exports = (eror,req,res,next) => {
	res.status(404).json({
		error:'Error'
	})
}