const express = require('express')
const User = require('../services/user')

module.exports = (app) =>{
	const router = express.Router()
	app.use('/api',router)
	const user_service = new User()
	
	router.get('/',(req,res)=>{
		return res.send('It Work')
	})
	router.get('/hola',(req,res)=>{
		return res.send('hola')
	})

	router.get('/peticion',(req,res)=>{
		user_service.muchos()
			.then(re=>{
				return res.json(re)
			})
	})
}
