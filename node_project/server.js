const express = require('express')
const bodyParser = require('body-parser')

const config = require('./config')
const db = require('./db')
const routes = require('./network/routes')

var app = express()


db(config.dbUrl)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

routes(app)

app.use(express.static('bower_components'))
app.use(config.publicRoute, express.static('public'))

app.listen(config.port)

console.log('Server ready on port 4000')