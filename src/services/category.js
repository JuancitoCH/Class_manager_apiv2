const response_format_no_async = require('../helpers/response_format_no_async')
const response_format_Promise = require('../helpers/response_format_Promise')
const { Category_repository } = require('../repository')
const Workspace_Service = require('./workspace')


class Category_Service{
	constructor(){
		this.Workspace_Service=new Workspace_Service()
		
	}

	async get_all(){
		return response_format_Promise(
			Category_repository.get_all(),
			'Obtain'
		)
	}
	async get_categories_workspace(user_info,workspace_id){
		const permision=await this.Workspace_Service.user_have_permissions(user_info,workspace_id,-1)
		if(!permision.success) return permision
		
		return response_format_Promise(
			Category_repository.get_categories_relation_workspace_data({
				workspace_id,
			}),
			'Obtain'
		)
	}
	async create(data){
		const {
			name,type,description,password,
			workspace_id,
			user_info
		} = data
		if(!name || type==undefined )return {
			success:false,
			code:400,
			message:'You must include the fields name and type'
		}
		// si necesito crear el objeto global lo creo
		const permision=await this.Workspace_Service.user_have_permissions(user_info,workspace_id,0)
		if(!permision.success) return permision

		const category = await Category_repository.create({name,type,description,password})
		await Category_repository.create_workspace_relation({
			workspace_id,
			category_id:category.data.id
		})

		return response_format_no_async(
			category,
			'Create'
		)
	}
	async update(data){
		const {
			name,type,description,password,
			category_id,
			user_info
		} = data
		// obtener una category relation
		if(
			!name && !type && !description && !password
		)return{
			success:false,
			code:400,
			message:'Invalid Category: You Must include some of this fields to update: "name,type,description,password"'
		}

		const {data:{workspace_id}} = await Category_repository.get_categories_relation_workspace({category_id})
		if(!workspace_id) return{
			success:false,
			code:400,
			message:'Invalid Category: Not found'
		}

		const permision=await this.Workspace_Service.user_have_permissions(user_info,workspace_id,0)
		if(!permision.success) return permision
		// const category = await 

		return response_format_Promise(
			Category_repository.update(category_id,{name,type,description,password}),
			'Updat'
		)
	}
	async delete(data){
		const {
			category_id,
			workspace_id,
			user_info
		} = data
		const permision=await this.Workspace_Service.user_have_permissions(user_info,workspace_id,0)
		if(!permision.success) return permision
		const relation = await Category_repository.delete_workspace_relation({
			workspace_id,
			category_id
		})
		console.log(relation)

		return response_format_Promise(
			Category_repository.delete_by_id(category_id),
			'Delete'
		)

	}
	
}
module.exports = Category_Service