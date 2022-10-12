const express = require('express')
const Routes = require('./routes')
const app = express()
// list express routes
const express_list_rout = require('express-list-routes')
const {
	Express_serverStart,
} = require('./libs/')
const { 
	notfoundpath,
	handleError
} = require('./middlewares')


// middlewares zone
app.use(express.json())


// routes
Routes(app)

// 404
app.use(notfoundpath)
app.use(handleError)
// en los catchs debemos de pasarle al next el error para que funcione el catcher middelwer de errores

express_list_rout(app)
Express_serverStart(app)

// process.on('uncaughtException', err => {
// 	console.log(`Uncaught Exception: ${err.message}`)
// 	process.exit(1)
// })
