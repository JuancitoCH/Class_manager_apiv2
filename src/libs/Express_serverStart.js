const { port } = require('../config')

module.exports = app =>{
	app.listen(port,()=>{
		console.log('Listen on Port '+ port)
	})
}
