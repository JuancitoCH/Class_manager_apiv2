const user_service = require('./user')
const response_format_no_async = require('../helpers/response_format_no_async')
const response_format_Promise = require('../helpers/response_format_Promise')
const { Category_repository } = require('../repository')
const Workspace_Service = require('./workspace')


class Category_Service{
	constructor(){
		this.Workspace_Service=new Workspace_Service()
		
	}

	async category_user_have_permission(user_info,category_id,permision_role=-1){
		const message={
			success:false,
			code:400,
			message:'Invalid Category: User don\'t have permissions'
		}
		const {data} = await Category_repository.get_categories_relation_workspace({category_id})
		if(!data?.workspace_id){
			message.message='Invalid Category: Not found'
			return message
		}
		const permision=await this.Workspace_Service.user_have_permissions(user_info,data.workspace_id,permision_role)
		if(!permision.success) return message
		return {success:true}
	}

	async get_all(){
		return response_format_Promise(
			Category_repository.get_all(),
			'Obtain'
		)
	}
	async get_categories_workspace(user_info,workspace_id){
		if(!workspace_id)return {
			success:false,
			code:400,
			message:'Invalid Category: You must include a workspace_id'
		}
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
			message:'Invalid Category: You must include the fields name and type'
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

		const {data:workspace_data} = await Category_repository.get_categories_relation_workspace({category_id})
		if(!workspace_data?.workspace_id) return{
			success:false,
			code:400,
			message:'Invalid Category: Not found'
		}

		const permision=await this.Workspace_Service.user_have_permissions(user_info,workspace_data.workspace_id,0)
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

	async add_user({user_info,category_id,data}){
		if(!data?.user_id)return{
			success:false,
			code:400,
			message:'Invalid Category: You Must Provide a user_id field'
		}

		const response = await this.category_user_have_permission(user_info,category_id,0)
		if(!response.success) return response
		
		const user_exist =await new user_service().one_user_id(data.user_id+'')
		if(!user_exist.success) return {
			success:false,
			code:500,
			message:'Invalid Category: Error User_Id'
		}

		return response_format_Promise(
			Category_repository.create_user_relation(category_id,data.user_id),
			'create',
			201
		)
	}
	async get_users({user_info,category_id}){
		const response = await this.category_user_have_permission(user_info,category_id,0)
		if(!response.success) return response

		return response_format_Promise(
			Category_repository.get_category_users(category_id),
			'obtain',
			200
		)
	}
	
}
module.exports = Category_Service