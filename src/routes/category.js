const express = require('express')
const {auth_permisions} = require('../middlewares/')
const {Category_Service:Category} = require('../services')

module.exports = (app) =>{
	const router = express.Router()
	app.use('/api/category',router)
	
	const category_Service = new Category()
	
	router.get('/',auth_permisions([3]),(req,res,next)=>{
		category_Service.get_all()
			.then(re=>{
				return res.status(re.code).json(re)
			}).catch(e=>next(e))
	})
	router.get('/:workspace_id',auth_permisions([0,1,2,3]),(req,res,next)=>{
		category_Service.get_categories_workspace(req.user_data,req.params.workspace_id)
			.then(re=>{
				return res.status(re.code).json(re)
			}).catch(e=>next(e))
	})
	router.post('/:workspace_id',auth_permisions([0,1,2,3]),(req,res,next)=>{
		category_Service.create({
			workspace_id:req.params.workspace_id,
			user_info:req.user_data,
			...req.body
		})
			.then(re=>{
				return res.status(re.code).json(re)
			}).catch(e=>next(e))
	})
	router.patch('/:category_id',auth_permisions([0,1,2,3]),(req,res,next)=>{
		category_Service.update({
			user_info:req.user_data,
			category_id:req.params.category_id,
			...req.body
		})
			.then(re=>{
				return res.status(re.code).json(re)
			}).catch(e=>next(e))
	})
	router.delete('/:workspace_id',auth_permisions([0,1,2,3]),(req,res,next)=>{
		category_Service.delete({
			workspace_id:req.params.workspace_id,
			user_info:req.user_data,
			...req.body
		})
			.then(re=>{
				return res.status(re.code).json(re)
			}).catch(e=>next(e))
	})

	router.get('/user/:category_id',auth_permisions([0,1,2,3]),(req,res,next)=>{
		category_Service.get_users({
			user_info:req.user_data,
			category_id:req.params.category_id,
		})
			.then(re=>{
				return res.status(re.code).json(re)
			}).catch(e=>next(e))
	})
	router.post('/user/:category_id',auth_permisions([0,1,2,3]),(req,res,next)=>{
		category_Service.add_user({
			user_info:req.user_data,
			category_id:req.params.category_id,
			data:req.body
		})
			.then(re=>{
				return res.status(re.code).json(re)
			}).catch(e=>next(e))
	})

}