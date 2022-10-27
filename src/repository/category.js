const return_Promise = require('../helpers/repository/return_repository_Promise')
const { Prisma_client } = require('../libs')

class Categoty_repository{
	static async get_all(){
		return return_Promise(Prisma_client.category.findMany())
	}
	static async get_one(filters){
		return return_Promise(Prisma_client.category.findFirst({
			where:{ ...filters }
		}))
	}
	static async create(data){
		return return_Promise(Prisma_client.category.create({
			data
		}))
	}
	static async delete_by_id(id){
		return return_Promise(Prisma_client.category.delete({
			where:{id}
		}))
	}
}
module.exports = Categoty_repository