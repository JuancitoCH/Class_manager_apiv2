const return_Promise = require('../helpers/repository/return_repository_Promise')
const { Prisma_client } = require('../libs')


class provider_queries{
	static async get_all(){
		return return_Promise(Prisma_client.provider.findMany())
	}
	static async get_one(filters){
		return return_Promise(Prisma_client.provider.findFirst({
			where:{ ...filters }
		}))
	}
}
module.exports = provider_queries