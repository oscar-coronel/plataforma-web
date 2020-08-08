const express = require('express')
const bodyParser = require('body-parser')
const routes = require('./network/routes')

//const router = require('./components/message/network')


var app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
//app.use(router)

routes(app)

app.use('/', express.static('public'))

app.listen(4000)