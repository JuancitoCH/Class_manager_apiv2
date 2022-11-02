const response_format_Promise = require('../helpers/response_format_Promise')
const Workspace_Repository = require('../repository/workspace')

class Workspace_Service {
	async getAll(){
		return response_format_Promise(
			Workspace_Repository.get_all(),
			'Succesfully Obtained All'
		)
	}
	async getUserWorkspace(user_info){
		return response_format_Promise(
			Workspace_Repository.get_many({
				owner:user_info.id
			}),
			'Succesfully Obtained All'
		)
	}
	async createUserWorkspace(data,user_info){
		if(!(data.name?.length > 3)) return {
			success:false,
			code:400,
			message:'Invalid Workspace: You Must Include a Name With at least 3 words of lenght'
		}
		const data_formated={
			name: data.name,
			owner: user_info.id,
			description: data.description
		}
		return response_format_Promise(
			Workspace_Repository.create(data_formated),
			'Succesfully Created'
		)
	}
	async deleteUserWorkspace(user_info,workspace_ids){
		if(!workspace_ids)return{
			success:false,
			code:400,
			message:'Invalid Workspace: You Must Include an Array of ids in the field ids'
		}
		const ids_formated = workspace_ids.filter(id=>typeof(id)==typeof(' '))
		return response_format_Promise(
			Workspace_Repository.delete_ids_owner(user_info.id,ids_formated),
			`You Try To Delete This Ids [ ${ids_formated} ]`
		)
	}

	async updateWorkspace(user_info,workspace_id,data){
		const workspace_info = await Workspace_Repository.get_one({id:workspace_id})
		if(!(workspace_info.data.owner == user_info.id))return {
			success:false,
			code:400,
			message:'Invalid Workspace: Action Not Authorize'
		}
		const filter = {
			// owner:user_info.id,
			id:workspace_id,
		}
		return response_format_Promise(
			Workspace_Repository.update(filter,data),
			'Successfully Updated'
		)
	}
	async getOne(user_info,workspace_id){
		const member_workspace = await Workspace_Repository.get_One_member({
			user_id:user_info.id,
			workspace_id
		})
		return response_format_Promise(
			Workspace_Repository.get_one({
				id:workspace_id,
				...(!member_workspace.data ? {owner:user_info.id}:{})
			}),
			'Successfully Obtained'
		)
	}
	async getOne_member(user_id,workspace_id){
		return response_format_Promise(
			Workspace_Repository.get_One_member({
				workspace_id,
				user_id
			}),
			'Obtain'
		)
	}
	async getWorkspaceWhereUserAreIn(user_info){
		return response_format_Promise(
			Workspace_Repository.get_relation_members_works({
				user_id:user_info.id
			}),
			'Successfully Obtained'
		)
	}

	async add_member_workspace(user_info,workspace_id,data){
		// User Who Added must have the permissions or be the owner
		// Editor 1 and 2, 3(Admin)
		if(!data.member_id)return{
			success:false,
			code:400,
			message:'Invalid Workspace: You must include a Field member_id'
		}
		const permission_acepted= await this.user_have_permissions(user_info,workspace_id,0)
		if(!permission_acepted.success)return permission_acepted

		const user_alredy= await Workspace_Repository.get_One_member({
			workspace_id,
			user_id :data.member_id,
		})
		// User Alredy in workspace?
		if(user_alredy.data) return {
			success:false,
			code:400,
			message:'Invalid Workspace: user Alredy in the Workspace'
		}
		const data_formated = {
			workspace_id,
			user_id :data.member_id,
			role:data.role
		}
		return response_format_Promise(
			Workspace_Repository.add_member(data_formated),
			'Successfully Added'
		)
	}

	async update_rol_member(user_info,workspace_id,data){
		const permission_acepted= await this.user_have_permissions(user_info,workspace_id,2)
		if(!permission_acepted.success)return permission_acepted
		const {member_id,role}=data
		if(role>3)return {
			success:false,
			code:400,
			message:'Invalid Workspace: Role Cant\'t be more than 3'
		}

		return response_format_Promise(
			Workspace_Repository.update_member(workspace_id,member_id,{role}),
			'Successfully Updated'
		)
	}
	async delete_member(user_info,workspace_id,data){
		const permission_acepted= await this.user_have_permissions(user_info,workspace_id,2)
		if(!permission_acepted.success)return permission_acepted
		const {member_id} = data
		return response_format_Promise(
			Workspace_Repository.delete_member(workspace_id,member_id),
			'Successfully Deleted'
		)
	}

	async user_have_permissions(user_info,workspace_id,role_range_exeption){
		try{
			const workspace_info = await Workspace_Repository.get_one({id:workspace_id})
			const workspace_user_whoadd = await this.getOne_member(user_info.id,workspace_id)
			if(
				workspace_user_whoadd.data?.role<=role_range_exeption &&
				workspace_info.data?.owner != user_info.id
			) return {
				success:false,
				code:400,
				message:'Invalid Workspace: User Don\'t have permissions'
			}
			else{
				if (workspace_user_whoadd.data==null &&
					workspace_info.data?.owner != user_info.id )
					return {
						success:false,
						code:400,
						message:'Invalid Workspace: User Don\'t have permissions'
					}
				return {
					success:true
				}
			}
		}catch(err){
			console.log(err)
			if(err.meta?.message?.match(/malformed \S*:/i)[0]) return {
				success:false,
				code:500,
				error:{
					message:'Invalid Workspace: '+err.meta.message.match(/malformed \S*:/i)[0] + ' Of the Workspace'
				}
			}
			return {
				success:false,
				code:500,
				error:{
					message:'Server Error Ocurred'
				}
			}
		}

		// Have Permisions?
		
	}
}
module.exports = Workspace_Service