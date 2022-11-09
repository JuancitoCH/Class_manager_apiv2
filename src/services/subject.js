const response_format_Promise = require('../helpers/response_format_Promise')
const { Subject_queries } = require('../repository')

// const id = parseInt(id_string)
// if(isNaN(id)) 	
// 	return {
// 		success:false,
// 		message:'id provided must be a integer'
// 	}

class Subject{
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


}

module.exports = Subject