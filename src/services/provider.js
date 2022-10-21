const response_format_Promise = require('../helpers/response_format_Promise')
const { provider_queries } = require('../repository')


class Provider_Service{
	async get_all(){
		return response_format_Promise(
			provider_queries.get_all(),
			'Succesfully Obtained All'
		)
	}
	async get_one(name){
		return response_format_Promise(
			provider_queries.get_one({name}),
			'Succesfully Obtained'
		)
	}
}
module.exports = Provider_Service