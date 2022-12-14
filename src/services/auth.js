const User_service = require('./user')
const jwt = require('jsonwebtoken')
const {jwt_secret} = require('../config/')
const bcrypt = require('bcrypt')
const Provider_Service = require('./provider')


class auth{
	constructor(){
		this.User = new User_service()
		this.Provider = new Provider_Service()
	}
	async login(data){
	
		const validation = this.credential_validation(data)
		if(!validation.success)return validation

		const {email,password} = data
		const user_validation = await this.User.one_user_by_email(email)
		if(!user_validation.success || 
            !await this.cryptCompare(password,user_validation.data?.password)) return {
			code:200,
			success:false,
			message:'Invalid Auth: Incorrect Credentials'
		}
		
		delete user_validation.data.password
		const token = this.getToken(user_validation.data)
		return {
			code:200,
			success:true,
			message:'Successfully loged',
			data:user_validation.data,
			token
		}
	}
	async signup(data){
		
		const validation = this.credential_validation(data,'signup')
		if(!validation.success) return validation

		const user_validation = await this.User.one_user_by_email(data.email)
		if(user_validation.success && user_validation.data!==null ) return {
			code:200,
			success:false,
			message:'Invalid Auth: You Can\'t Register this Email'
		}
		const crypt_password =await this.cryptPassword(data.password)
		const registered_user = await this.User.create({
			email:data.email,
			password:crypt_password,
			name:data.name,
		})
		delete registered_user.data?.password
		const token = this.getToken(registered_user.data)
		return {
			code:200,
			success:true,
			message:'Successfully Register',
			data:registered_user.data,
			token
		}
	}

	async SignIn_Provider(data,provider){
		const user_validation = await this.User.one_user_by_email(data.email)
		let user_response ={}
		const {data:{id:provider_id}} = await this.Provider.get_one(provider)
		if( user_validation && user_validation.data!==null  && user_validation.data?.provider==null ) return{
			success:false,
			message:'Invalid Auth: The User Cannot Login using This Service',
			data:null
		}

		if(user_validation.success && user_validation.data!==null) {
			delete user_validation.data?.password
			user_response = user_validation
		}else{
			user_response = await this.User.create({
				email:data.email,
				name:data.name,
				provider:provider_id
			})
		}
		
		const token = this.getToken(user_response.data)
		return {
			code:200,
			success:true,
			message:'Successfully signin',
			data:user_response.data,
			token
		}

	}

	credential_validation(credential,type='login'){
		const validation_fns = {
			login:(credential)=>{
				const {email} = credential
				if(!email) return {
					code:200,
					success:false,
					message:'Invalid Auth: An Email must be Provide'
				}
				return {
					success:true
				}
			},
			signup:(credential)=>{
				const {email,password,name} = credential

				if(!email || !password || !name) {
					let message = ' '
					message+= !email?'Email ':''
					message+= !password?'Password ':''
					message+= !name? 'Name ':''
					return {
						code:200,
						success:false,
						message:'Invalid Auth: '+ message +'must be Provide'
					}
				}
				return { success:true }
			}
		}
		return validation_fns[type](credential)
	}
	async cryptPassword(password){
		const salt = await bcrypt.genSalt(10)
		const cryptPassword = await bcrypt.hash(password,salt)
		return cryptPassword
	}
	async cryptCompare(text,hash){
		try{

			const result = await bcrypt.compare(text,hash)
			return result //true o false
		}catch{
			return false
		}
	}

	getToken(userData,time='7d'){
		const user = {
			id:userData.id,
			name:userData.name,
			password:userData.password,
			email:userData.email,
			permissions:userData.permissions
		}
		const token = jwt.sign(user,jwt_secret,{expiresIn:time})
		return token
	}

}
module.exports=auth