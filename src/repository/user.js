const return_Promise = require('../helpers/return_repository_Promise')
const { Prisma_client } = require('../libs')

class user_queries{
	static async get_all(){
		return return_Promise(Prisma_client.user.findMany())
	}
	static async get_one(filters){
		return return_Promise(Prisma_client.user.findFirst({
			where:{ ...filters }
		}))
	}
	static async create(data){
		return return_Promise(Prisma_client.user.create({
			data
		}))
	}
	static async update(filter,data){
		return return_Promise(Prisma_client.user.update({
			where:{ ...filter },
			data,
			
		}))
		// return return_Promise(Prisma_client.user.updateMany({
		// 	where:{ ...filter },
		// 	data,
			
		// }))
	}
}
module.exports = user_queries