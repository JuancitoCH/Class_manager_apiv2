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

}