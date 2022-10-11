const { user_queries } = require('../repository')

class user{
	one_user(id){
		// try{

		// 	const user_response = await user_queries.get_one(id)
		// 	return {
		// 		success:true,
		// 		message:' ',
		// 		...user_response,
		// 	}
		// }catch(err){
		// 	console.log(err)
		// 	console.log('_____')
		// 	return {
		// 		success:false,
		// 		error:{
		// 			message:err.message
		// 		}
		// 	}
		// }
		return user_queries.get_one(id)
			.then(user_response=>{
				return {
					success:true,
					message:' ',
					...user_response,
				}
			})
			.catch(err=>{
				return {
					success:false,
					error:{
						message:err.message
					}
				}
			})
	}
	muchos(){
		return user_queries.get_all()
			.then(user_response=>{
				return {
					success:true,
					message:' ',
					...user_response,
				}
			})
			.catch(err=>{
				return {
					success:false,
					error:{
						message:err.message
					}
				}
			})
	}
}

module.exports = user