const auth = require('./auth')
const category = require('./category')
const init = require('./init')
const subject = require('./subject')
const user = require('./user')
const workspace = require('./workspace')

module.exports = (app)=>{
	init(app)
	user(app)
	auth(app)
	workspace(app)
	category(app)
	subject(app)
}
