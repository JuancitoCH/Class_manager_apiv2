const express = require('express')
const User = require('../services/user')

module.exports = (app) =>{
	const router = express.Router()
	app.use('/api/user',router)
	
	const user_service = new User()
	
	router.get('/one/:id',(req,res)=>{
		const {id} = req.params
		user_service.one_user(id)
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
}