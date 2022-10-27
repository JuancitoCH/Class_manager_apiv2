module.exports = (data_passed,message,correct_code=200)=>{
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
	
}