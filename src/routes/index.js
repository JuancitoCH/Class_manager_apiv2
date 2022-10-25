const auth = require('./auth')
const init = require('./init')
const user = require('./user')
const workspace = require('./workspace')

module.exports = (app)=>{
	init(app)
	user(app)
	auth(app)
	workspace(app)
}
