const express = require('express')
const app = express()
const Routes = require('./routes/')
const {start} = require('./libs/')

Routes(app)

start(app)



