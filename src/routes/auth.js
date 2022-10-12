const express = require('express')
const auth_cookies_response = require('../helpers/auth/auth_cookies_response')
const auth_logout_response = require('../helpers/auth/auth_logout_response')
const { auth_service:Auth} = require('../services')


module.exports = (app) =>{
	const router = express.Router()
	app.use('/api/auth',router)
	const auth_service = new Auth()
	
	router.post('/login',(req,res)=>{
		auth_service.login(req.body)
			.then(response_data=>{
				return auth_cookies_response(res,response_data)
			})
	})
	router.post('/signup',(req,res)=>{
		auth_service.signup(req.body)
			.then(response_data=>{
				return res.status(response_data.code).json(response_data)
			})
	})
	router.get('/logout',(req,res)=>{
		auth_logout_response(res)
	})

}
