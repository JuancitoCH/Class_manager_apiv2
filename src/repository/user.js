const { Prisma_client } = require('../libs')

class user_queries{
	static get_all(){
		return Prisma_client.user.findMany()
			.then(res=> { return {data:res} })
			.catch(err=> { 
				console.log(err)
				throw err
			})
	}
	static get_one(id){
		return Prisma_client.user.findFirst({
			where:{ id }
		})	
			.then(res=> { return {data:res} })
			.catch(err=>{
				console.log(err)
				throw err
			})
	}
}
module.exports = user_queries