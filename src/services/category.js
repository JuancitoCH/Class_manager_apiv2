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
		Category_repository.create_workspace_relation({
			workspace_id,
			category_id:category.data.id
		})

		return response_format_no_async(
			category,
			'Create'
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