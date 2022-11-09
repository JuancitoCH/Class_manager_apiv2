const return_Promise = require('../helpers/repository/return_repository_Promise')
const { Prisma_client } = require('../libs')

// Example Google or Meta
class Subject_queries{
	static async get_all(){
		return return_Promise(Prisma_client.subject.findMany())
	}
	static async get_one(filters){
		return return_Promise(Prisma_client.subject.findFirst({
			where:{ ...filters }
		}))
	}
	static async create(data){
		return return_Promise(Prisma_client.subject.create({
			data
		}))
	}
}
module.exports = Subject_queries