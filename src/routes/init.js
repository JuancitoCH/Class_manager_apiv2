const express = require('express')

module.exports = (app) =>{
	const router = express.Router()
	app.use('/api/',router)

	router.get('/',(req,res)=>{
		return res.send('It Work')
	})
	router.get('/hola',(req,res)=>{
		return res.send('hola')
	})
	return router
}
