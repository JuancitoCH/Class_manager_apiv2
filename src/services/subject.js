const response_format_Promise = require('../helpers/response_format_Promise')
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
	async get_all(){
		return response_format_Promise(
			Subject_queries.get_all(),
			'obtain',
			200
		)
	}
	async get_one({subject_id}){
		return response_format_Promise(
			Subject_queries.get_one({id:subject_id}),
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
			message:'Invalid Subject: url Field \'category_id\' must be included'
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
			message:'Invalid Subject: url Field \'category_id\' must be included'
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
				category_id
			}),
			'delete',
			201
		)

	}


}

module.exports = Subject