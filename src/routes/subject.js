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
	router.post('/create/:category_id',auth_permisions([0,1,2,3]),(req,res,next)=>{
		subject_Service.create({
			category_id:req.params.category_id,
			user_info:req.user_data,
			data:req.body
		})
			.then(re=>{
				console.log(re)
				return res.status(re.code).json(re)
			}).catch(e=>next(e))
	})
	router.delete('/delete/:category_id',auth_permisions([0,1,2,3]),(req,res,next)=>{
		subject_Service.delete({
			category_id:req.params.category_id,
			user_info:req.user_data,
			data:req.body
		})
			.then(re=>{
				console.log(re)
				return res.status(re.code).json(re)
			}).catch(e=>next(e))
	})
	router.patch('/update/:category_id',auth_permisions([0,1,2,3]),(req,res,next)=>{
		subject_Service.update({
			category_id:req.params.category_id,
			user_info:req.user_data,
			data:req.body
		})
			.then(re=>{
				console.log(re)
				return res.status(re.code).json(re)
			}).catch(e=>next(e))
	})

}