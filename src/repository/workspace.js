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
				wk_member_relation:{select:{
					role:true,
					user_relation:{select:{
						id:true,
						name:true,
						email:true,
					}}
				}},
				wcategory_relation:{select:{
					category_relation:{
						select:{
							id:true,
							name:true,
							type:true,
							description:true
						}
					},
				}

				}
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
	// ---------- -Members section- ---------
	static async add_member(data){
		return return_Promise(Prisma_client.workspace_member.create({
			data,
		}))
	}

	// static async get_members(){}
	static async get_relation_members_works(filter){
		return return_Promise(Prisma_client.workspace_member.findMany({
			where:{...filter},
			include:{
				workspace_relation:true
			}
		}))
	}
	static async get_One_member(filters){
		return return_Promise(Prisma_client.workspace_member.findFirst({
			where:{...filters}
		}))
	}
	static async delete_member(workspace_id,member_id){
		return return_Promise(Prisma_client.workspace_member.deleteMany({
			where:{	
				workspace_id,
				user_id:member_id
			}
		}))
	}
	static async update_member(workspace_id,member_id,data){
		return return_Promise(Prisma_client.workspace_member.updateMany({
			where:{	
				workspace_id,
				user_id:member_id
			},
			data
		}))
	}
	// ---------- -Members section End- ---------


}
module.exports = Workspace_Repository