const express = require('express')
const auth_cookies_response = require('../helpers/auth/auth_cookies_response')
const auth_logout_response = require('../helpers/auth/auth_logout_response')
const { auth_service:Auth} = require('../services')
const passport = require('../libs/passport')

module.exports = (app) =>{
	const router = express.Router()
	app.use('/api/auth',router)
	const auth_service = new Auth()
	
	router.post('/login',(req,res,next)=>{
		auth_service.login(req.body)
			.then(response_data=>{
				return auth_cookies_response(res,response_data)
			}).catch(e=>{
				next(e)
			})
	})
	router.post('/signup',(req,res,next)=>{
		auth_service.signup(req.body)
			.then(response_data=>{
				return auth_cookies_response(res,response_data)
			}).catch(e=>{
				next(e)
			})
	})
	router.get('/logout',(req,res)=>{
		auth_logout_response(res)
	})

	router.get('/google',
		passport.authenticate('google')
	)
	router.get('/google/callback',
		passport.authenticate('google'),(req,res,next)=>{
			
			auth_service.SignIn_Provider(req.user.profile._json,'Google')
				.then(response_data=>{
					return auth_cookies_response(res,response_data)
				}).catch(e=>next(e))
			// return res.redirect('/api/')
		}
	)

	router.get('/facebook',
		passport.authenticate('facebook')
	)
	router.get('/facebook/callback',
		passport.authenticate('facebook',{ failureRedirect: '/api/' }),(req,res,next)=>{
			console.log(req.user.profile)
			auth_service.SignIn_Provider(req.user.profile._json,'Facebook')
				.then(response_data=>{
					return auth_cookies_response(res,response_data)
				}).catch(e=>next(e))
		}
	)
}
