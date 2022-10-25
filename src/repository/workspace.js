const return_Promise = require('../helpers/repository/return_repository_Promise')
const { Prisma_client } = require('../libs')

class Workspace_Repository{
	static async get_all(){
		return return_Promise(Prisma_client.workspace.findMany())
	}
	static async get_many(filter){
		return return_Promise(Prisma_client.workspace.findMany({
			where:{...filter}
		}))
	}
	static async get_one(filters){
		return return_Promise(Prisma_client.workspace.findFirst({
			where:{ ...filters },
			include:{
				wk_member_relation:true
			}
		}))
	}
	static async create(data){
		return return_Promise(Prisma_client.workspace.create({
			data,
		}))
	}
	static async delete_ids(ids){
		return return_Promise(Prisma_client.workspace.deleteMany({
			where:{
				id:{in:ids}
			}
		}))
	}
	static async delete_ids_owner(owner,ids){
		return return_Promise(Prisma_client.workspace.deleteMany({
			where:{
				id:{in:ids},
				owner
			}
		}))
	}
	static async update(filter,data){
		return return_Promise(Prisma_client.workspace.update({
			where:{ ...filter },
			data,
			
		}))
	}
}
module.exports = Workspace_Repository