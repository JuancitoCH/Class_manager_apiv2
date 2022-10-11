const response_format_Promise = require('../helpers/response_format_Promise')
const { user_queries } = require('../repository')


class user{
	async one_user(id_string){
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
}

module.exports = user