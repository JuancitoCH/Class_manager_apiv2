const express = require('express')
const {auth_permisions} = require('../middlewares/')
const {Category_Service:Category} = require('../services')

module.exports = (app) =>{
	const router = express.Router()
	app.use('/api/category',router)
	
	const category_Service = new Category()
	
	
	router.get('/',auth_permisions([3]),(req,res)=>{
		category_Service.get_all()
			.then(re=>{
				return res.status(re.code).json(re)
			})
	})
	router.post('/:workspace_id',auth_permisions([0,1,2,3]),(req,res)=>{
		category_Service.create({
			workspace_id:req.params.workspace_id,
			user_info:req.user_data,
			...req.body
		})
			.then(re=>{
				return res.status(re.code).json(re)
			})
	})
	router.delete('/:workspace_id',auth_permisions([0,1,2,3]),(req,res)=>{
		category_Service.delete({
			workspace_id:req.params.workspace_id,
			user_info:req.user_data,
			...req.body
		})
			.then(re=>{
				return res.status(re.code).json(re)
			})
	})

}