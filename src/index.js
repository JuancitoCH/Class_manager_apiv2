const express = require('express')
const app = express()

const express_list_rout = require('express-list-routes')
const {
	Express_serverStart,
	router:Routes
} = require('./libs/')

const { 
	notfoundpath,
	handleError
} = require('./middlewares')

// middlewares zone
app.use(express.json())

// routes
Routes(app)
console.log(process.env.NODE_ENV)


// 404
app.use(notfoundpath)
app.use(handleError)
// en los catchs debemos de pasarle al next 
// el error para que funcione el catcher middelwer 
// de errores

express_list_rout(app)

Express_serverStart(app)


// process.on('uncaughtException', err => {
// 	console.log(`Uncaught Exception: ${err.message}`)
// 	process.exit(1)
// })


