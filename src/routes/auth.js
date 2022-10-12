const express = require('express')
const { auth_service:Auth} = require('../services')


module.exports = (app) =>{
	const router = express.Router()
	app.use('/api/auth',router)
	const auth_service = new Auth()
	
	router.post('/login',(req,res)=>{
		auth_service.login(req.body)
			.then(re=>{
				return res.status(re.code).json(re)
			})
	})

}
