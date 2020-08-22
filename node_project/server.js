const express = require('express')
const bodyParser = require('body-parser')

const config = require('./config')
const db = require('./db')
const routes = require('./network/routes')

var app = express()

const server = require('http').Server( app )
const io = require('socket.io')(server)

const socket = require('./socket')

db(config.dbUrl)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))



socket.connect(server)

routes(app)



app.use(express.static('bower_components'))
app.use(config.publicRoute, express.static('public'))

server.listen(config.port, function(){
    console.log('Servidor Activo')
})

console.log('Server ready on port '+config.port)