const Category_repository = require('./category')
const provider_queries = require('./provider')
const Subject_queries = require('./subject')
const user_queries = require('./user')
const Workspace_Repository = require('./workspace')

module.exports={
	user_queries,
	provider_queries,
	Workspace_Repository,
	Category_repository,
	Subject_queries
}