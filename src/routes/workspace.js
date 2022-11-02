const express = require('express')
const {auth_permisions} = require('../middlewares/')
const { Workspace_Service:Workspace} = require('../services')

module.exports = (app) =>{
	const router = express.Router()
	app.use('/api/workspace',router)
	
	const workspace_service = new Workspace()
	
	
	router.get('/',auth_permisions([3]),(req,res,next)=>{
		workspace_service.getAll()
			.then(re=>{
				return res.status(re.code).json(re)
			}).catch(e=>next(e))
	})
	router.get('/in',auth_permisions([0,1,2,3]),(req,res,next)=>{
		workspace_service.getWorkspaceWhereUserAreIn(req.user_data)
			.then(re=>{
				return res.status(re.code).json(re)
			}).catch(e=>next(e))
	})
	router.post('/',auth_permisions([0,1,2,3]),(req,res,next)=>{
		workspace_service.createUserWorkspace(req.body,req.user_data)
			.then(re=>{
				return res.status(re.code).json(re)
			}).catch(e=>next(e))
	})
	router.get('/user',auth_permisions([0,1,2,3]),(req,res,next)=>{
		workspace_service.getUserWorkspace(req.user_data)
			.then(re=>{
				return res.status(re.code).json(re)
			}).catch(e=>next(e))
	})
	router.get('/user/one/:id',auth_permisions([0,1,2,3]),(req,res,next)=>{
		workspace_service.getOne(req.user_data,req.params.id)
			.then(re=>{
				return res.status(re.code).json(re)
			}).catch(e=>next(e))
	})
	router.delete('/user',auth_permisions([0,1,2,3]),(req,res,next)=>{
		workspace_service.deleteUserWorkspace(req.user_data,req.body.ids)
			.then(re=>{
				return res.status(re.code).json(re)
			}).catch(e=>next(e))
	})
	router.patch('/user/:id',auth_permisions([0,1,2,3]),(req,res,next)=>{
		workspace_service.updateWorkspace(
			req.user_data,
			req.params.id,
			req.body
		)
			.then(re=>{
				return res.status(re.code).json(re)
			}).catch(e=>next(e))
	})
	router.post('/member/add/:id',auth_permisions([0,1,2,3]),(req,res,next)=>{
		workspace_service.add_member_workspace(req.user_data,req.params.id,req.body)
			.then(re=>{
				return res.status(re.code).json(re)
			}).catch(e=>next(e))
	})
	router.patch('/member/update/:id',auth_permisions([0,1,2,3]),(req,res,next)=>{
		workspace_service.update_rol_member(req.user_data,req.params.id,req.body)
			.then(re=>{
				return res.status(re.code).json(re)
			}).catch(e=>next(e))
	})
	router.delete('/member/delete/:id',auth_permisions([0,1,2,3]),(req,res,next)=>{
		workspace_service.delete_member(req.user_data,req.params.id,req.body)
			.then(re=>{
				return res.status(re.code).json(re)
			}).catch(e=>next(e))
	})
}