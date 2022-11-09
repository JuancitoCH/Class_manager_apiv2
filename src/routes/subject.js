const express = require('express')
const {auth_permisions} = require('../middlewares/')
const {Subject} = require('../services')

module.exports = (app) =>{
	const router = express.Router()
	app.use('/api/subject',router)
	
	const subject_Service = new Subject()
	
	router.get('/',auth_permisions([3]),(req,res,next)=>{
		subject_Service.get_all()
			.then(re=>{
				return res.status(re.code).json(re)
			}).catch(e=>next(e))
	})
	router.get('/one/:subject_id',auth_permisions([3]),(req,res,next)=>{
		subject_Service.get_one({
			subject_id:req.params.subject_id
		})
			.then(re=>{
				return res.status(re.code).json(re)
			}).catch(e=>next(e))
	})

}