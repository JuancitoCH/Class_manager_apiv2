const init = require('./init')
const user = require('./user')

module.exports = (app)=>{
	init(app),
	user(app)

}
