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
}
module.exports = Subject_queries