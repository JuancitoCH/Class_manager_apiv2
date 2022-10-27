const Categoty_repository = require('./category')
const provider_queries = require('./provider')
const user_queries = require('./user')
const Workspace_Repository = require('./workspace')

module.exports={
	user_queries,
	provider_queries,
	Workspace_Repository,
	Categoty_repository
}