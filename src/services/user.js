const response_format_Promise = require('../helpers/response_format_Promise')
const { user_queries } = require('../repository')


class user{
	async one_user_id(id_string){
		const id = parseInt(id_string)
		if(isNaN(id)) 	
			return {
				success:false,
				message:'id provided must be a integer'
			}

		return response_format_Promise(
			user_queries.get_one({
				id
			}),
			'message'
		)
	}
	async one_user_by_email(email_nofilter){
		const email = email_nofilter.replace(' ','')
		return response_format_Promise(
			user_queries.get_one({
				email
			})
				.then(res=>{
					if(res.data == null) return {
						success:false,
						data:null,
						message:'User not found'
					}
					return res
				}),
			'user get it'
		)
	}
	async all_users(){
		return response_format_Promise(
			user_queries.get_all(),
			'message'
		)
	}
	async create(body_data){
		body_data.permissions = 1
		return response_format_Promise(
			user_queries.create(body_data),
			'Successfully created'
		)
	}

	async update(body_data){
		const { 
			filter,
			data:data_update } = body_data
		if(filter.id){
			filter.id = parseInt(filter.id)
			if(isNaN(filter.id))
				return {
					success:false,
					message:'id provided must be a integer'
				}
		}
		
		return response_format_Promise(
			user_queries.update(filter,data_update),
			'Successfully Updated'
		)
	}
	async delete_ids(ids){
		let ids_formated = ids.map(id=>{
			const id_res = parseInt(id)
			if(isNaN(id_res)) return
			return id_res
		})
		ids_formated = ids_formated.filter(id=>id!=undefined)
		return response_format_Promise(
			user_queries.delete_ids(ids_formated),
			'Successfully Deleted, ids deleted [ '+ids_formated+' ]'
		)
	}

}

module.exports = user