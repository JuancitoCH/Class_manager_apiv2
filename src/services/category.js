const response_format_Promise = require('../helpers/response_format_Promise')
const { Categoty_repository } = require('../repository')


class Category_Service{
	async get_all(){
		return response_format_Promise(
			Categoty_repository.get_all(),
			'Obtain'
		)
	}
	async create(data){
		return response_format_Promise(
			Categoty_repository.create(data),
			'Obtain'
		)
	}
	
}
module.exports = Category_Service