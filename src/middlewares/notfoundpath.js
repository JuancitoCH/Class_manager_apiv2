module.exports = (req,res)=>{
	return res.status(404).json({
		error:'not found'
	})
	// next()
}
