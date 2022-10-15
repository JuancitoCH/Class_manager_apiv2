module.exports = (promise,message,correct_code=200)=>{
	return promise.
		then(data_passed=>{
			return {
				code:correct_code,
				success:true,
				message,
				data:data_passed.data,
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
					message:err.meta ? err.meta.message :'a Server error ocurred'
					// message:'a Server error ocurred'
				}
			}
		})
}