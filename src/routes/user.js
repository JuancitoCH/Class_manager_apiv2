const express = require('express')
const {auth_permisions} = require('../middlewares/')
const { user_service:User} = require('../services')

module.exports = (app) =>{
	const router = express.Router()
	app.use('/api/user',router)
	
	const user_service = new User()
	
	router.post('/one',(req,res,next)=>{
		const {email}=req.body
		user_service.one_user_by_email(email)
			.then(re=>{
				return res.status(re.code).json(re)
			}).catch(e=>next(e))
	})
	router.get('/one/:id',(req,res,next)=>{
		const {id} = req.params
		user_service.one_user_id(id)
			.then(re=>{
				return res.status(re.code).json(re)
			}).catch(e=>next(e))
	})
	

	router.get('/all',auth_permisions([3]),(req,res,next)=>{
		user_service.all_users()
			.then(re=>{
				return res.status(re.code).json(re)
			}).catch(e=>next(e))
	})
	router.post('/create',(req,res,next)=>{
		user_service.create(req.body)
			.then(re=>{
				return res
					.status(re.code)
					.json(re)
			}).catch(e=>next(e))
	})
	router.delete('/delete',(req,res,next)=>{
		user_service.delete_ids(req.body.ids)
			.then(re=>{
				return res
					.status(re.code)
					.json(re)
			}).catch(e=>next(e))
	})

	router.patch('/update/:id',(req,res,next)=>{
		const data = {
			filter:{id:req.params.id},
			data:req.body
		}
		user_service.update(data)
			.then(re=>{
				return res
					.status(re.code)
					.json(re)
			}).catch(e=>next(e))
	})
}