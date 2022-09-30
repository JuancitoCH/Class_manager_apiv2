const routes = require('../routes')
module.exports = app => {
	routes.forEach(element => {
		app.use('/api/'+element,require('../routes/'+element)())
	})
}