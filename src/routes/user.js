const express = require('express')
const { user_service:User} = require('../services')

module.exports = (app) =>{
	const router = express.Router()
	app.use('/api/user',router)
	
	const user_service = new User()
	
	router.post('/one',(req,res)=>{
		const {email}=req.body
		user_service.one_user_by_email(email)
			.then(re=>{
				return res.status(re.code).json(re)
			})
	})
	router.get('/one/:id',(req,res)=>{
		const {id} = req.params
		user_service.one_user_id(id)
			.then(re=>{
				return res.status(re.code).json(re)
			})
	})
	

	router.get('/all',(req,res)=>{
		user_service.all_users()
			.then(re=>{
				return res.status(re.code).json(re)
			})
	})
	router.post('/create',(req,res)=>{
		user_service.create(req.body)
			.then(re=>{
				return res
					.status(re.code)
					.json(re)
			})
	})

	router.patch('/update/:id',(req,res)=>{
		const data = {
			filter:{id:req.params.id},
			data:req.body
		}
		user_service.update(data)
			.then(re=>{
				return res
					.status(re.code)
					.json(re)
			})
	})
}