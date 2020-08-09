const express = require('express')
const bodyParser = require('body-parser')
const routes = require('./network/routes')

var app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

routes(app)

app.use(express.static('bower_components'))
app.use('/', express.static('public'))

app.listen(4000)