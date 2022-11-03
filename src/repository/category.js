const return_Promise = require('../helpers/repository/return_repository_Promise')
const { Prisma_client } = require('../libs')

class Category_repository{
	static async get_all(){
		return return_Promise(Prisma_client.category.findMany())
	}
	static async get_categories_relation_workspace_data(filter){
		return return_Promise(Prisma_client.workspace_category.findMany({
			where:{
				...filter
			},
			select:{
				category_relation:{
					select:{
						id:true,
						name:true,
						description:true,
						type:true
					}
				},
			}
		}))
	}
	static async get_categories_relation_workspace(filter){
		return return_Promise(Prisma_client.workspace_category.findFirst({
			where:{
				...filter
			},
		}))
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
	static async update(category_id,data){
		return return_Promise(Prisma_client.category.update({
			where:{
				id:category_id
			},
			data
		}))
	}
	static async delete_by_id(id){
		return return_Promise(Prisma_client.category.delete({
			where:{id}
		}))
	}

	// relation table workspace

	static async create_workspace_relation(data){
		return return_Promise(Prisma_client.workspace_category.create({
			data
		}))
	}
	static async delete_workspace_relation(filters){
		return return_Promise(Prisma_client.workspace_category.deleteMany({
			where:{...filters},
		}))
	}

	// static async create_subject_relation(category_id,subject_id){
	// 	return return_Promise(Prisma_client.category_subject.create())
	// }
	static async create_user_relation(category_id,user_id){
		return return_Promise(Prisma_client.category_User.create({
			data:{
				category_id,
				user_id
			}
		}))
	}

	static async get_category_users(category_id){
		return return_Promise(Prisma_client.category_User.findMany({
			where:{
				category_id
			},
			select:{
				user_relation:{
					select:{
						id:true,
						email:true,
						name:true,
					}
				}
			}
		}))
	}
}
module.exports = Category_repository