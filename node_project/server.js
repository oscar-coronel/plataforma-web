const express = require('express')
const bodyParser = require('body-parser')

const db = require('./db')
const routes = require('./network/routes')

var app = express()

const uri = 'mongodb+srv://ocoronel:lGPH5WgGxY4BvZ5s@cluster0.0sp2y.gcp.mongodb.net/ups?retryWrites=true&w=majority'
db(uri)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

routes(app)

app.use(express.static('bower_components'))
app.use('/', express.static('public'))

app.listen(4000)