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
			message:'You Must Include a Name With at least 3 words of lenght'
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
			message:'You Must Include an Array of ids in the field ids'
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
			message:'Action Not Authorize'
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
		return response_format_Promise(
			Workspace_Repository.get_one({
				id:workspace_id,
				owner:user_info.id
			}),
			'Successfully Obtained'
		)
	}
	async getOne_member(){
		// return response_format_Promise(
		// 	Workspace_Repository.get_one({
		// 		id:workspace_id,
		// 		owner:user_info.id
		// 	}),
		// 	'Successfully Obtained'
		// )
	}
	async add_member_workspace(workspace_id,data){
		// User Who Added must have the permissions or be the owner
		const user_alredy= await Workspace_Repository.get_One_member({
			workspace_id,
			user_id :data.member_id,
		})
		console.log(user_alredy)
		if(user_alredy.data) return {
			success:false,
			code:400,
			message:'user Alredy in the Workspace'
		}
		const data_formated = {
			workspace_id,
			user_id :data.member_id,
			role:data.role
		}
		return response_format_Promise(
			Workspace_Repository.add_member(data_formated),
			'Successfully Created'
		)
	}
}
module.exports = Workspace_Service