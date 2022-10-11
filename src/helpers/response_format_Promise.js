module.exports = (promise,message,correct_code=200)=>{
	return promise.
		then(user_response=>{
			return {
				code:correct_code,
				success:true,
				message,
				...user_response,
			}
		})
		.catch(err=>{
			console.log('-------Error Ocurred--------')
			console.log(err)
			console.log('-------Error end--------')
			return {
				code:500,
				success:false,
				error:{
					// message:err.message
					message:'a Server error ocurred'
				}
			}
		})
}