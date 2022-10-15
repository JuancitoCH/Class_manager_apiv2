const express = require('express')
const Routes = require('./routes')
const cookieParser = require('cookie-parser')
const app = express()
// list express routes
const express_list_rout = require('express-list-routes')
const session = require('express-session')

const {
	Express_serverStart,
} = require('./libs/')
const { 
	notfoundpath,
	handleError
} = require('./middlewares')


// middlewares zone
// this middelware is required for passport
app.use(session({
	secret: 'keyboard cat',
	resave: false,
	saveUninitialized: false,
}))
app.use(express.json())
app.use(cookieParser())

// routes
Routes(app)

// 404
app.use(notfoundpath)
app.use(handleError)


express_list_rout(app)
Express_serverStart(app)

// process.on('uncaughtException', err => {
// 	console.log(`Uncaught Exception: ${err.message}`)
// 	process.exit(1)
// })
