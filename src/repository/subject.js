const return_Promise = require('../helpers/repository/return_repository_Promise')
const { Prisma_client } = require('../libs')

class Subject_queries{
	static async get_all(filters){
		return return_Promise(Prisma_client.subject.findMany({
			where:{
				...(filters && filters)
			}
		}))
	}
	static async get_all_category(filters){
		return return_Promise(Prisma_client.category_subject.findMany({
			where:{
				...(filters && filters)
			},
			include:{
				subject_relation:true
			}
		}))
	}

	static async get_one(filters){
		return return_Promise(Prisma_client.category_subject.findFirst({
			where:{ ...filters },
			include:{
				subject_relation:true
			}
		}))
	}

	static async create(data){
		return return_Promise(Prisma_client.category_subject.create({
			data:{
				category_relation:{ connect:{ id:data.category_id} },
				subject_relation:{
					create:{
						name:data.name,
						description:data.description,
						owner_id:data.owner_id
					}
				}
			},
			include:{
				subject_relation:true
			}
		}))
	}
	static async delete(data){
		await Prisma_client.category_subject.deleteMany({
			where:{
				category_id:data.category_id,
				subject_id:data.subject_id
			},
		})
		return return_Promise(Prisma_client.subject.delete({
			where:{
				id:data.subject_id
			},
		}))
	}
	static async update({
		subject_id,
		data
	}){
		return return_Promise(Prisma_client.subject.update({
			where:{
				id:subject_id
			},
			data
		}))
	}

	static async get(){
		return return_Promise(Prisma_client.subject.findMany())
	}
	
}
module.exports = Subject_queries