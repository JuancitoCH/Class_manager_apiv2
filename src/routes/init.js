const express = require('express')

module.exports = () =>{
	const router = express.Router()

	router.get('/',(req,res)=>{
		console.log('a')
		console.log('Funcionando')
		return res.send('It Work')
	})
	router.get('/hola',(req,res)=>{
		console.log('a')
		console.log('Funcionando')
		return res.send('It Work')
	})
	return router
}
