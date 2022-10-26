module.exports = (promise,message,correct_code=200)=>{
	return promise.
		then(data_passed=>{
			if(!data_passed.data) return{
				code:correct_code,
				success:false,
				message:'No Records for '+message,
				data:null,
			}
			if(data_passed.data?.count==0)return{
				code:correct_code,
				success:false,
				message:'No Records for '+message,
				data:data_passed.data,
			}
			return {
				code:correct_code,
				success:true,
				message:'Succesfully '+message +'ed',
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