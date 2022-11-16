const response_format_Promise = require('../helpers/response_format_Promise')
const response_format_no_async = require('../helpers/response_format_no_async')
const { Subject_queries } = require('../repository')
const Category_Service = require('./category')

// const id = parseInt(id_string)
// if(isNaN(id)) 	
// 	return {
// 		success:false,
// 		message:'id provided must be a integer'
// 	}

class Subject{
	constructor(){
		this.CategoryService = new Category_Service()
	}
	async get_from_Category({
		category_id,
		user_info
	}){
		const permission = await this.CategoryService.category_user_have_permission(user_info,category_id,-1)
		if(!permission.success) return permission
		const response_unformated = await Subject_queries.get_all_category({
			category_id,
		})
		const response ={}
		response.data = response_unformated.data.map((category)=>{
			return category.subject_relation
		})
		return response_format_no_async(
			response,
			'obtain',
			200
		)
	}
	async get_all(){
		return response_format_Promise(
			Subject_queries.get_all(),
			'obtain',
			200
		)
	}
	async get_one({user_info,category_id,subject_id}){
		if(!category_id) return{
			success:false,
			code:400,
			message:'Invalid Subject: Url Param \'category_id\' must be included'
		}
		if(!subject_id ) return {
			success:false,
			code:400,
			message:'Invalid Subject: Field \'subject_id\' must be included'
		}
		const permission = await this.CategoryService.category_user_have_permission(user_info,category_id,0)
		if(!permission.success) return permission

		return response_format_Promise(
			Subject_queries.get_one({subject_id,category_id}),
			'obtain',
			200
		)
	}
	async create({
		category_id,
		user_info,
		data
	}){
		if(!data.name) return {
			success:false,
			code:400,
			message:'Invalid Subject: Field \'name\' must be included'
		}
		const permission = await this.CategoryService.category_user_have_permission(user_info,category_id,0)
		if(!permission.success) return permission

		return response_format_Promise(
			Subject_queries.create({
				name:data.name,
				description:data.description,
				owner_id:user_info.id,
				category_id
			}),
			'create',
			201
		)

	}
	async delete({
		category_id,
		user_info,
		data
	}){
		if(!category_id) return{
			success:false,
			code:400,
			message:'Invalid Subject: Url Param \'category_id\' must be included'
		}
		if(!data.subject_id ) return {
			success:false,
			code:400,
			message:'Invalid Subject: Field \'subject_id\' must be included'
		}
		const permission = await this.CategoryService.category_user_have_permission(user_info,category_id,0)
		if(!permission.success) return permission

		return response_format_Promise(
			Subject_queries.delete({
				subject_id:data.subject_id,
				category_id
			}),
			'delete',
			201
		)

	}
	// TODO: // implementar el Update
	async update({
		category_id,
		user_info,
		data
	}){
		if(!category_id) return{
			success:false,
			code:400,
			message:'Invalid Subject: Url Param \'category_id\' must be included'
		}
		if(!data.subject_id ) return {
			success:false,
			code:400,
			message:'Invalid Subject: Field \'subject_id\' must be included'
		}
		const permission = await this.CategoryService.category_user_have_permission(user_info,category_id,0)
		if(!permission.success) return permission

		return response_format_Promise(
			Subject_queries.update({
				subject_id:data.subject_id,
				data:{
					...(data.name && {name:data.name}),
					...(data.description && {description:data.description}),
				}
			}),
			'update',
			201
		)

	}


}

module.exports = Subject