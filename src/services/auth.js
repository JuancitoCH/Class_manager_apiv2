const User_service = require('./user')
class auth{
	constructor(){
		this.User = new User_service()
	}
	async login(data){
		const {email,password} = data
		if(!email) return {
			code:200,
			success:false,
			message:'An Email must be Provide'
		}
		const user_validation = await this.User.one_user_by_email(email)
		if(!user_validation.success || 
            password !== user_validation.data.password) return {
			code:200,
			success:false,
			message:'Incorrect Credentials'
		}
		return {
			code:200,
			success:true,
			message:'Successfully loged',
			data:user_validation.data
		}

	}

}
module.exports=auth