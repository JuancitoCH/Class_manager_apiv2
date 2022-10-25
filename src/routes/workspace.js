const express = require('express')
const {auth_permisions} = require('../middlewares/')
const { Workspace_Service:Workspace} = require('../services')

module.exports = (app) =>{
	const router = express.Router()
	app.use('/api/workspace',router)
	
	const workspace_service = new Workspace()
	
	
	router.get('/',auth_permisions([3]),(req,res)=>{
		workspace_service.getAll()
			.then(re=>{
				return res.status(re.code).json(re)
			})
	})
	router.post('/',auth_permisions([0,1,2,3]),(req,res)=>{
		workspace_service.createUserWorkspace(req.body,req.user_data)
			.then(re=>{
				return res.status(re.code).json(re)
			})
	})
	router.get('/user',auth_permisions([0,1,2,3]),(req,res)=>{
		workspace_service.getUserWorkspace(req.user_data)
			.then(re=>{
				return res.status(re.code).json(re)
			})
	})
	router.get('/user/one/:id',auth_permisions([0,1,2,3]),(req,res)=>{
		workspace_service.getOne(req.params.id)
			.then(re=>{
				return res.status(re.code).json(re)
			})
	})
	router.delete('/user',auth_permisions([0,1,2,3]),(req,res)=>{
		workspace_service.deleteUserWorkspace(req.user_data,req.body.ids)
			.then(re=>{
				return res.status(re.code).json(re)
			})
	})
	router.patch('/user/:id',auth_permisions([0,1,2,3]),(req,res)=>{
		workspace_service.updateWorkspace(
			req.user_data,
			req.params.id,
			req.body
		)
			.then(re=>{
				return res.status(re.code).json(re)
			})
	})
}